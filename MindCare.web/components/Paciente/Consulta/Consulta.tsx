import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";
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
  id: number;
  setModoAdiar: (v: boolean) => void;
  buscarConsultas: () => void;
  setSelecionada: (consulta: Consulta) => void;
};

export default function Consulta({ navigation, route }) {
  const { id } = route.params;
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [selecionada, setSelecionada] = useState<Consulta | null>(null);
  const [modoAdiar, setModoAdiar] = useState(false);
  const [nome, setNome] = useState<string | null>(null);
  const { width } = useWindowDimensions();

  const pegarData = () => {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
    const dia = agora.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  const buscarConsultas = async () => {
    try {
      const responde = await axios.get<Consulta[]>(`${getUrl()}/MindCare/API/consultas`);
      const consultasseparada = responde.data;
      const consultasfiltrada = consultasseparada.filter(
        (consulta) =>
          consulta.idpaci === id &&
          (consulta.status === "Pendente" || consulta.status === "Adiado")
      );
      setConsultas(consultasfiltrada);
      for (const consulta of consultasfiltrada) {
        if (consulta.data < pegarData() && consulta.status !== 'Completa') {
          await axios.put(`${getUrl()}/MindCare/API/consultas/${consulta.id}`, {
            data: consulta.data,
            hora: consulta.hora,
            idpaci: consulta.idpaci,
            idpro: consulta.idpro,
            status: "Perdida",
            link: '',
          });
        }
      }
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  };

  const pegarprofissional = async (consulta: Consulta) => {
    try {
      const profissional = await axios.get(`${getUrl()}/MindCare/API/profissionais/${consulta.idpro}`);
      const user = await axios.get(`${getUrl()}/MindCare/API/users/${profissional.data.id}`);
      setNome(user.data.nome);
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
    }
  };

  useEffect(() => {
    const carregar = async () => {
      await buscarConsultas();
    };

    carregar();

    const intervalo = setInterval(buscarConsultas, 1000);
    return () => clearInterval(intervalo);
  }, [id]);

  useEffect(() => {
    if (consultas.length > 0) {
      const consultaMaisProxima = consultas.reduce((maisProxima, atual) => {
        return new Date(atual.data) < new Date(maisProxima.data) ? atual : maisProxima;
      });

      setSelecionada(consultaMaisProxima);
      pegarprofissional(consultaMaisProxima);
    }
  }, [consultas]);

  const Analisar = (consulta: Consulta) => {
    setSelecionada(consulta);
  };

  const entrarNaChamada = (consulta: Consulta) => {
    if ((consulta.link && consulta.data.toString().split("T")[0] === pegarData()) || consulta.hora <= pegarData()) {
      alert('Antes de iniciar a consulta, certifique-se de estar em um local tranquilo e com uma boa conexão à internet...');
      navigation.navigate('VideoCall', { link: consulta.link, hora: consulta.hora, data: consulta.data });
    } else {
      alert('A consulta ainda não está disponível, por favor entre no horário marcado, obrigado.');
    }
  };

  const renderAnalisarWeb = () => {
    if (!selecionada) {
      return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: "#e3e6e3" }}>
          <Text style={{ color: '#000' }}>
            Selecione uma consulta para visualizar os detalhes.
          </Text>
        </View>
      );
    }

    if (modoAdiar) {
      return (
        <AdiarConsultaInline
          selecionada={selecionada}
          id={id}
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
          source={{
            uri: "https://img.freepik.com/vetores-premium/trevo-com-quatro-folhas-isoladas-no-fundo-branco-conceito-da-sorte-no-estilo-cartoon-realista_302536-46.jpg",
          }}
          style={styles.logo}
        />
        <Text style={[styles.consultaText, { backgroundColor: '#2a8c26', textAlign: 'center', marginTop: 40 }]}>
          Data: {formattedDate}     |     Hora: {formattedTime}
        </Text>
        <View style={styles.Vbotao}>
          <TouchableOpacity style={[styles.botao, { backgroundColor: '#fff' }]} onPress={() => setModoAdiar(true)}>
            <Text style={[styles.buttonText, { color: '#4CD964' }]}>Adiar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.botao, { backgroundColor: '#fff' }]}
            onPress={() => entrarNaChamada(selecionada)}
          >
            <Text style={[styles.buttonText, { color: '#4CD964' }]}>Entrar</Text>
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
            source={{
              uri: "https://aebo.pt/wp-content/uploads/2024/05/spo-300x300.png",
            }}
            style={styles.logo}
          />
          <Text style={{ textAlign: "center", marginTop: 30, color: "#000" }}>
            Marca uma consulta para começar a sua jornada de bem-estar!
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.Inf}
          data={consultas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => Analisar(item)}>
              <View>
                <Text style={[styles.consultaText, { fontWeight: "bold", fontSize: 16 }]}>Consulta com: {nome}</Text>
                <Text style={styles.consultaText}>
                  Data: {item.data ? item.data.toString().split("T")[0] : ""}
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
    <View style={[styles.container, { flexDirection: "row", marginTop: 60 }]}>
      <View style={{ width: "30%", borderRightWidth: 2, borderColor: "#2E8B57" }}>
        {renderLista()}
      </View>
      <View style={{ flex: 1 }}>{renderAnalisarWeb()}</View>
    </View>
  );
}

const AdiarConsultaInline = ({ selecionada, id, setModoAdiar, buscarConsultas, setSelecionada }: AdiarProps) => {
  const [datamarcacao, setDatan] = useState<Date | null>(
    selecionada?.data ? new Date(selecionada.data) : null
  );
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
        idpro: selecionada.idpro,
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
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor: 'transparent',
            textAlign: 'center',
            color: datamarcacao ? '#4CD964' : '#6fcf87',
            cursor: 'pointer',
          }}
          value={
            datamarcacao
              ? `${datamarcacao.getFullYear()}-${(datamarcacao.getMonth() + 1)
                  .toString()
                  .padStart(2, '0')}-${datamarcacao.getDate().toString().padStart(2, '0')}`
              : ''
          }
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              const [anoStr, mesStr, diaStr] = value.split('-');
              const ano = parseInt(anoStr, 10);
              const mes = parseInt(mesStr, 10);
              const dia = parseInt(diaStr, 10);
              if (!isNaN(ano) && !isNaN(mes) && !isNaN(dia)) {
                const dataLocal = new Date(ano, mes - 1, dia, 12);
                setDatan(dataLocal);
              }
            }
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <input
          type="time"
          style={{
            width: "100%", height: "100%", border: "none", backgroundColor: "transparent",
            textAlign: "center", color: tempomarcacao ? "#4CD964" : "#6fcf87"
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