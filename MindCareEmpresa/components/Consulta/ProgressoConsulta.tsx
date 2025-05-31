import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { getUrl } from "@/app/utils/url";
import DateTimePicker from "@react-native-community/datetimepicker";

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

export default function Progresso({ navigation, route }) {
  const { idp } = route.params;
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [selecionada, setSelecionada] = useState<Consulta | null>(null);
  const [modoAdiar, setModoAdiar] = useState(false);
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
        (consulta) =>
          consulta.idpaci === idp &&
          (consulta.status === "Pendente" || consulta.status === "Adiada")
      );
      setConsultas(consultasfiltrada);

      for (const consulta of consultasfiltrada) {
        if (consulta.data < pegarData() && consulta.status !== "Completo") {
          await axios.put(`${getUrl()}/MindCare/API/consultas/${consulta.id}`, {
            ...consulta,
            status: "Perdida",
            link: "",
          });
        }
      }
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  };

  const pegarpaciente = async (consultas: Consulta) => {
    try {
      const paciente = await axios.get(`${getUrl()}/MindCare/API/pacientes/${consultas.idpaci}`);
      const user = await axios.get(`${getUrl()}/MindCare/API/users/${paciente.data.id}`);
      setNome(user.data.nome);
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
    }
  };

  useEffect(() => {
    buscarConsultas();
    const intervalo = setInterval(buscarConsultas, 1000);
    return () => clearInterval(intervalo);
  }, [idp]);

  useEffect(() => {
    if (consultas.length > 0) {
      const consultaMaisProxima = consultas.reduce((maisProxima, atual) =>
        new Date(atual.data) < new Date(maisProxima.data) ? atual : maisProxima
      );
      setSelecionada(consultaMaisProxima);
      pegarpaciente(consultaMaisProxima);
    }
  }, [consultas]);

  const Analisar = (consulta: Consulta) => {
    navigation.navigate("AnalisarConsultasp", {
      idConsulta: consulta.id,
      dataConsulta: consulta.data,
      horaConsulta: consulta.hora,
      idprof: consulta.idpro,
      idp: idp,
      statusConsulta: consulta.status,
      link: consulta.link,
      nome: nome,
    });
  };

  const entrarNaChamada = async (consulta: Consulta) => {
    if (consulta.link && consulta.data.toString().split("T")[0] === pegarData()) {
      alert(
        "Antes de iniciar a consulta, certifique-se de estar em um local tranquilo e com uma boa conexão à internet. Ao ingressar, você passará por uma tabela de seleção. Por favor, selecione a opção 'Você é o anfitrião', adicione a sua conta e aguarde a entrada do Paciente."
      );
      navigation.navigate("VideoCall", {
        link: consulta.link,
        hora: consulta.hora,
        data: consulta.data,
      });
    } else {
      alert("A consulta ainda não está disponível, por favor entre no horário marcado.");
    }
  };

  const Apagarconsulta = async (consulta: Consulta) => {
    try {
      await axios.delete(`${getUrl()}/MindCare/API/consultas/${consulta.id}`);
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao cancelar consulta:", error);
    }
  };

  const Confirmarconsulta = async (consulta: Consulta) => {
    try {
      await axios.put(`${getUrl()}/MindCare/API/consultas/${consulta.id}`, {
        ...consulta,
        status: "Concluida",
        link: "",
      });
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao confirmar consulta:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Consultas</Text>
      {modoAdiar && selecionada ? (
        <AdiarConsultaInline
          selecionada={selecionada}
          idp={idp}
          setModoAdiar={setModoAdiar}
          buscarConsultas={buscarConsultas}
          setSelecionada={setSelecionada}
        />
      ) : consultas.length === 0 ? (
        <View>
          <Image
            source={{
              uri: "https://aebo.pt/wp-content/uploads/2024/05/spo-300x300.png",
            }}
            style={styles.logo}
          />
          <Text style={{ textAlign: "center", marginTop: 30, color: "#fff" }}>
            Marque uma consulta para começar a sua jornada de bem-estar!
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
    </View>
  );
}

const AdiarConsultaInline = ({
  selecionada,
  idp,
  setModoAdiar,
  buscarConsultas,
  setSelecionada,
}: AdiarProps) => {
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

      <DateTimePicker
        value={datamarcacao || new Date()}
        mode="date"
        display="default"
        onChange={(_, date) => date && setDatan(date)}
      />

      <DateTimePicker
        value={tempomarcacao || new Date()}
        mode="time"
        display="default"
        onChange={(_, time) => time && settempo(time)}
      />

      <TouchableOpacity style={styles.botao} onPress={Adiar}>
        <Text style={styles.buttonText}>Confirmar Adiamento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setModoAdiar(false)}
        style={[styles.botao, { marginTop: 10, backgroundColor: "#ccc" }]}>
        <Text style={[styles.buttonText, { color: "#4CD964" }]}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E8B57",
  },
  titulo: {
    fontSize: 25,
    marginBottom: 10,
    backgroundColor: "#4CD964",
    color: "#fff",
    height: 40,
    textAlign: "center",
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
    backgroundColor: "#2E8B57",
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
});