import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
} from "react-native";
import axios from "axios";
import { getUrl } from "@/app/utils/url";
import { Ionicons } from "@expo/vector-icons";

type Consulta = {
  id: number;
  data: string;
  hora: string;
  idpaci: number;
  idpro: number;
  status: string;
  link: string;
};

export default function PP({ route }) {
  const { idp } = route.params;
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [selecionada, setSelecionada] = useState<Consulta | null>(null);
  const [nome, setNome] = useState<string | null>(null);

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
        (consulta) => consulta.idpaci === idp);
      
      
      setConsultas(consultasfiltrada);
      for (const consulta of consultasfiltrada) {
        if (consulta.data < pegarData() && consulta.status !== 'Completo') {
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

  const pegarpaciente = async (consultas: Consulta) => {
    try {
      const paciente = await axios.get(`${getUrl()}/MindCare/API/pacientes/${consultas.idpaci}`);
      const user = await axios.get(`${getUrl()}/MindCare/API/users/${paciente.data.id}`);
      setNome(user.data.nome);
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
    }
  }

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

  const renderLista = () => (
    <>
      <FlatList
        style={styles.Inf}
        data={consultas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
              <Text style={[styles.consultaText, { fontWeight: "bold", fontSize: 16 }]}>Consulta</Text>
              <Text style={[styles.consultaText, { fontWeight: "bold", fontSize: 13 }]}>
                Data: {item.data ? item.data.toString().split("T")[0] : ""}                </Text>
              <Text style={[styles.consultaText, { fontWeight: "bold", fontSize: 13 }]}>Hora: {item.hora.slice(0, 5)}</Text>
              <Text style={[styles.consultaText, { fontWeight: "bold", fontSize: 13 }]}>Status: {item.status}</Text>
          </View>
        )}
      />
    </>
  );  

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Ionicons style={{marginLeft: 5}} name="arrow-back-outline" size={25} color={"#20613d"} onPress={() => navigation.goBack()}/>
        <Text style={styles.titulo}>Progresso de Consultas do: {nome}</Text>
      </View>
      {renderLista()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 20,
    backgroundColor: '#fff',
    color: '#000',
    height: 40,
    justifyContent: 'center',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    marginHorizontal: 5,
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
});