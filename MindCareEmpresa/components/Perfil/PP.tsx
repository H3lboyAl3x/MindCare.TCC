import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,FlatList,} from "react-native";
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

export default function PP({ route, navigation }) {
  const { idp } = route.params;
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [nome, setNome] = useState<string | null>(null);

  const buscarConsultas = async () => {
    try {
      const responde = await axios.get<Consulta[]>(`${getUrl()}/MindCare/API/consultas`);
      const consultasseparada = responde.data;
      const consultasfiltrada = consultasseparada.filter((consulta) => consulta.idpaci === idp);
      setConsultas(consultasfiltrada);     
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  };

  const pegarpaciente = async () => {
    try {
      const user = await axios.get(`${getUrl()}/MindCare/API/users/${idp}`);
      setNome(user.data.nome);
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
    }
  }

  useEffect(() => {
    const carregar = async () => {
      await buscarConsultas();
      await pegarpaciente();
    };
    carregar();
    const intervalo = setInterval(buscarConsultas, 1000);
    return () => clearInterval(intervalo);
  }, [idp]);  

  const renderLista = () => {
    if(consultas.length === 0)
    {
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Este pacinte nao tem nenhum registro de Consultas!</Text>
        </View>
      );
    }else{
      return (
        <FlatList
          style={styles.Inf}
          data={consultas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
                <Text style={[styles.consultaText, { fontWeight: "bold", fontSize: 16 }]}>Consulta</Text>
                <Text style={[styles.consultaText, { fontWeight: "bold", fontSize: 13 }]}>Data: {item.data ? item.data.toString().split("T")[0] : ""}</Text>
                <Text style={[styles.consultaText, { fontWeight: "bold", fontSize: 13 }]}>Hora: {item.hora.slice(0, 5)}</Text>
                <Text style={[styles.consultaText, { fontWeight: "bold", fontSize: 13 }]}>Status: {item.status}</Text>
            </View>
          )}
        />
      );
    }
  };  

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, width: '98%', alignSelf: 'center'}}>
        <Ionicons style={{marginLeft: 5}} name="arrow-back-outline" size={30} color={"#20613d"} onPress={() => navigation.goBack()}/>
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
    fontSize: 15,
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: 'bold',
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