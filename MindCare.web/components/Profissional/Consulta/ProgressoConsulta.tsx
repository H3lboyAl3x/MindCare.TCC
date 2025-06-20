import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,FlatList,TouchableOpacity,useWindowDimensions,Image,} from "react-native";
import axios from "axios";
import { getUrl } from "@/app/utils/url";

type Consulta = {
  id: number;
  data: string;
  hora: string;
  idpaci: number;
  idpro: number;
  status: string;
  link: string;
};

type AdiarProps = {
  selecionada: Consulta;
  idp: number;
  setModoAdiar: (v: boolean) => void;
  buscarConsultas: () => void;
  setSelecionada: (consulta: Consulta) => void;
};

export default function Progresso({ route }) {
  const { idp } = route.params;
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [selecionada, setSelecionada] = useState<Consulta | null>(null);
  const [modoAdiar, setModoAdiar] = useState(false);
  const { width } = useWindowDimensions();
  const [nome, setNome] = useState<string | null>(null);

  const pegarData = () => {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = (agora.getMonth() + 1).toString().padStart(2, "0");
    const dia = agora.getDate().toString().padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const buscarConsultas = async () => {
    try {
      const responde = await axios.get<Consulta[]>(`${getUrl()}/MindCare/API/consultas`);
      const consultasseparada = responde.data;
      const consultasfiltrada = consultasseparada.filter(
        (consulta) => consulta.idpaci === idp && consulta.status === "Pendente"
      );

      setConsultas(consultasfiltrada);
      for (const consulta of consultasfiltrada) {
        if (consulta.data < pegarData() && consulta.status !== "Completo") {
          await axios.put(`${getUrl()}/MindCare/API/consultas/${consulta.id}`, {
            data: consulta.data,
            hora: consulta.hora,
            idpaci: consulta.idpaci,
            idpro: consulta.idpro,
            status: "Perdida",
            link: "",
          });
        }
      }
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  };

  const pegarpaciente = async (consulta: Consulta) => {
    try {
      const paciente = await axios.get(`${getUrl()}/MindCare/API/pacientes/${consulta.idpaci}`);
      const user = await axios.get(`${getUrl()}/MindCare/API/users/${paciente.data.id}`);
      setNome(user.data.nome);
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
    }
  };

  useEffect(() => {
    const carregar = async () => {
      await buscarConsultas();
    };

    carregar();

    const intervalo = setInterval(buscarConsultas, 1000);
    return () => clearInterval(intervalo);
  }, [idp]);

  useEffect(() => {
    if (consultas.length > 0) {
      const consultaMaisProxima = consultas.reduce((maisProxima, atual) => {
        return new Date(atual.data) < new Date(maisProxima.data) ? atual : maisProxima;
      });

      setSelecionada(consultaMaisProxima);
      pegarpaciente(consultaMaisProxima);
    }
  }, [consultas]);

  const entrarNaChamada = async (consulta: Consulta) => {
    if (consulta.link && consulta.data.toString().split("T")[0] === pegarData()) {
      window.open(consulta.link, "_blank");
    } else {
      alert("A consulta ainda não está disponível. Por favor, entre no horário marcado.");
    }
  };

  const Apagarconsulta = async (consulta: Consulta) => {
    try {
      await axios.delete(`${getUrl()}/MindCare/API/consultas/${consulta.id}`);
      buscarConsultas();
    } catch (error) {
      console.error("Erro ao cancelar consulta:", error);
    }
  };

  const Confirmarconsulta = async (consulta: Consulta) => {
    try {
      await axios.put(`${getUrl()}/MindCare/API/consultas/${consulta.id}`, {
        data: consulta.data,
        hora: consulta.hora,
        idpaci: consulta.idpaci,
        idpro: consulta.idpro,
        status: "Concluida",
        link: "",
      });
      buscarConsultas();
    } catch (error) {
      console.error("Erro ao confirmar consulta:", error);
    }
  };

  const renderAnalisarWeb = () => {
    if (!selecionada) {
      return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: "#e3e6e3" }}>
          <Text style={{ color: "#000" }}>Selecione uma consulta para visualizar os detalhes.</Text>
        </View>
      );
    }

    if (modoAdiar) {
      return (
        <AdiarConsultaInline
          selecionada={selecionada}
          idp={idp}
          setModoAdiar={setModoAdiar}
          buscarConsultas={buscarConsultas}
          setSelecionada={setSelecionada}
        />
      );
    }

    const formattedDate = new Date(selecionada.data).toISOString().split("T")[0];
    const formattedTime = selecionada.hora.slice(0, 5);

    return (
      <View style={{ flex: 1, backgroundColor: "#4CD964", padding: 20 }}>
        <Image
          source={require('../../../assets/images/trevo.jpg')}
          style={styles.logo}
        />
        <Text style={[styles.consultaText, { backgroundColor: "#2a8c26", textAlign: "center", marginTop: 40 }]}>
          Data: {formattedDate} | Hora: {formattedTime}
        </Text>
        <View style={styles.Vbotao}>
          <TouchableOpacity style={[styles.botao, { backgroundColor: "#fff" }]} onPress={() => setModoAdiar(true)}>
            <Text style={[styles.buttonText, { color: "#4CD964" }]}>Adiar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botao, { backgroundColor: "#fff" }]} onPress={() => entrarNaChamada(selecionada)}>
            <Text style={[styles.buttonText, { color: "#4CD964" }]}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.Vbotao, { marginTop: 5 }]}>
          <TouchableOpacity style={[styles.botao, { backgroundColor: "#fff" }]} onPress={() => Confirmarconsulta(selecionada)}>
            <Text style={[styles.buttonText, { color: "#4CD964" }]}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botao, { backgroundColor: "#fff" }]} onPress={() => Apagarconsulta(selecionada)}>
            <Text style={[styles.buttonText, { color: "#fa393d" }]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderLista = () => (
    <>
      {consultas.length === 0 ? (
        <View>
          <Image
            source={require('../../../assets/images/mente.png')}
            style={styles.logo}
          />
          <Text style={{ textAlign: "center", marginTop: 30, color: "#000" }}>
            Marque uma consulta para começar a sua jornada de bem-estar!
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.Inf}
          data={consultas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => { setSelecionada(item); pegarpaciente(item); }}>
              <View>
                <Text style={[styles.consultaText, { fontWeight: "bold", fontSize: 16 }]}>
                  Consulta com: {nome}
                </Text>
                <Text style={styles.consultaText}>
                  Data: {item.data.toString().split("T")[0]}
                </Text>
                <Text style={styles.consultaText}>Hora: {item.hora.slice(0, 5)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );

  return (
    <View style={[styles.container, { flexDirection: "row" }]}>
      <View style={{ width: "30%", borderRightWidth: 2, borderColor: "#2E8B57" }}>
        {renderLista()}
      </View>
      <View style={{ flex: 1 }}>{renderAnalisarWeb()}</View>
    </View>
  );
}

const AdiarConsultaInline = ({ selecionada, idp, setModoAdiar, buscarConsultas, setSelecionada }: AdiarProps) => {
  const [datamarcacao, setDatan] = useState<Date | null>(selecionada?.data ? new Date(selecionada.data) : null);
  const [tempomarcacao, settempo] = useState<Date | null>(
    selecionada?.hora ? new Date(`1970-01-01T${selecionada.hora}`) : null
  );

  const Adiar = async () => {
    if (!datamarcacao || !tempomarcacao) {
      alert("Por favor, selecione a data e a hora antes de marcar a consulta.");
      return;
    }

    const formattedDate = datamarcacao.toISOString().split("T")[0];
    const formattedTime = tempomarcacao.toTimeString().slice(0, 5);

    try {
      await axios.put(`${getUrl()}/MindCare/API/consultas/${selecionada.id}`, {
        data: formattedDate,
        hora: formattedTime,
        idpaci: selecionada.idpaci,
        idpro: idp,
        status: "Pendente",
      });

      await buscarConsultas();
      setSelecionada({ ...selecionada, data: formattedDate, hora: formattedTime });
      setModoAdiar(false);
    } catch (error) {
      console.error("Erro ao adiar consulta:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, textAlign: "center", color: "#4CD964" }}>Adiar Consulta</Text>
      <TouchableOpacity style={styles.input}>
        <input
          type="date"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            backgroundColor: "transparent",
            textAlign: "center",
            color: datamarcacao ? "#4CD964" : "#6fcf87",
            cursor: "pointer",
          }}
          value={
            datamarcacao
              ? `${datamarcacao.getFullYear()}-${(datamarcacao.getMonth() + 1).toString().padStart(2, "0")}-${datamarcacao
                  .getDate()
                  .toString()
                  .padStart(2, "0")}`
              : ""
          }
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              const [anoStr, mesStr, diaStr] = value.split("-");
              const dataLocal = new Date(parseInt(anoStr), parseInt(mesStr) - 1, parseInt(diaStr), 12);
              setDatan(dataLocal);
            }
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <input
          type="time"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            backgroundColor: "transparent",
            textAlign: "center",
            color: tempomarcacao ? "#4CD964" : "#6fcf87",
          }}
          value={tempomarcacao ? tempomarcacao.toTimeString().slice(0, 5) : ""}
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(":");
            const novaHora = new Date();
            novaHora.setHours(parseInt(hours));
            novaHora.setMinutes(parseInt(minutes));
            novaHora.setSeconds(0);
            settempo(novaHora);
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={Adiar}>
        <Text style={styles.buttonText}>Confirmar Adiamento</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModoAdiar(false)} style={[styles.botao, { marginTop: 10, backgroundColor: "#ccc" }]}>
        <Text style={[styles.buttonText, { color: "#4CD964" }]}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 20,
    backgroundColor: "#e7fbe6",
    marginTop: 50,
    alignSelf: "center",
  },
  card: {
    padding: 15,
    backgroundColor: "#4CD964",
    height: 100,
    borderRadius: 20,
    marginTop: 5,
    marginHorizontal: 5,
  },
  consultaText: {
    fontSize: 14,
    color: "#fff",
  },
  Inf: {
    backgroundColor: "#fff",
  },
  Vbotao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 200,
  },
  botao: {
    width: 200,
    height: 50,
    marginHorizontal: 25,
    backgroundColor: "#4CD964",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#4CD964",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    justifyContent: "center",
  },
});