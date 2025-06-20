import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,FlatList,Platform,} from "react-native";
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

export default function PP({ route }) {
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
    if(consultas.length === 0){
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Este pacinte nao tem nenhum registro de Consultas!</Text>
        </View>
      );
    }else{
      return(
        <>
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
        </>
      );
    }
  }  

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Progresso de Consultas do: {nome}</Text>
      {renderLista()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? "#fff" : "#2E8B57",
  },
  titulo: {
    fontSize: 20,
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
    backgroundColor: Platform.OS === 'web' ? "#fff" : "#2E8B57",
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