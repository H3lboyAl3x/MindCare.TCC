import React, { useEffect, useRef, useState } from "react";
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  ActivityIndicator, Platform, ScrollView,
  Animated
} from "react-native";
import axios from "axios";
import { getUrl } from "@/app/utils/url";

interface Paciente {
  id: number;
  tempoexperiencia: number;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  datanascimento: string;
}

interface PacienteComNome {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  datanascimento: string;
}

interface NumeroP {
  id: number;
  idprof: number;
  idpac: number;
}

export default function Consulta({ navigation, route }) {
  const { id } = route.params;
  const [paciente, setPaciente] = useState<PacienteComNome[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const Listaclientes = async () => {
    try {
      const NP = await axios.get<NumeroP[]>(`${getUrl()}/MindCare/API/numeroP/idprof/${id}`);
      const listaPacientes = NP.data;

      const pacienteComNomes: PacienteComNome[] = await Promise.all(
        listaPacientes.map(async (Numero) => {
          try {
            const pacResponse = await axios.get<Paciente>(`${getUrl()}/MindCare/API/pacientes/${Numero.idpac}`);
            const userResponse = await axios.get<Usuario>(`${getUrl()}/MindCare/API/users/${pacResponse.data.id}`);
            return {
              id: Numero.idpac,
              nome: userResponse.data.nome,
              email: userResponse.data.email,
              telefone: userResponse.data.telefone,
              datanascimento: userResponse.data.datanascimento ? userResponse.data.datanascimento.split("T")[0] : "",
            };
          } catch (error) {
            console.error(`Erro ao buscar paciente ${Numero.idpac}:`, error);
            return {
              id: Numero.idpac,
              nome: "Desconhecido",
              email: "Desconhecido",
              telefone: "Desconhecido",
              datanascimento: "Desconhecido",
            };
          }
        })
      );

      setPaciente(pacienteComNomes);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Listaclientes();
    const intervalo = setInterval(Listaclientes, 1000);
    return () => clearInterval(intervalo);
  }, [id]);

  const renderPaciente = (item: PacienteComNome) => (
    <TouchableOpacity
      style={[styles.card, {width: 230}]}
      onPress={() => navigation.navigate("Progresso", {
        idp: item.id,
      })}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.nome}>Email: {item.email}</Text>
    <Text style={styles.nome}>Telefone: {item.telefone}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Consultas</Text>
      <View style={[styles.Inf, { paddingTop: 10 }]}>
        {loading ? (
          <ActivityIndicator size="large" color="#34C759" />
        ) : (
          <FlatList
            data={paciente}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => 
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("Progresso", {
                    idp: item.id,
                })}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.nome}>Email: {item.email}</Text>
                <Text style={styles.nome}>Telefone: {item.telefone}</Text>
              </TouchableOpacity>
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CD964",
  },
  titulo: {
      fontSize: 25,
      marginBottom: 10,
      backgroundColor: '#4CD964',
      color: '#fff',
      height: 40,
      textAlign: 'center'
  },
  especialidades: {
    textAlign: "center",
    fontSize: 15,
    color: "#2E8B57",
    marginBottom: 5,
  },
  scrollEspecialidades: {
    paddingHorizontal: 10,
  },
  bolinhaContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  bolinha: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#41b555",
  },
  textoEspecialidade: {
    fontSize: 12,
    textAlign: "center",
    color: '#fff'
  },
  Textpro: {
    fontSize: 15,
    color: "white",
    backgroundColor: "#41b555",
    padding: 5,
    textAlign: "center",
    marginBottom: 5,
  },
  card: {
    backgroundColor: "#4CD964",
    padding: 10,
    borderRadius: 20,
    marginBottom: 5,
    marginHorizontal: 5,
  },
  nome: {
    fontSize: 12,
    fontWeight: "bold",
    color: '#fff'
  },
  Inf: {
      backgroundColor: '#2E8B57',
      height: '100%',
  },
});