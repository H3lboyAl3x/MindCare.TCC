import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image} from "react-native";
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

export default function Pacientes({ navigation, route }) {
  const { id, nomep } = route.params;
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
      onPress={() => navigation.navigate("Paciente", {
        idu: id,
        id: item.id,
        nome: item.nome,
        email: item.email,
        telefone: item.telefone,
        datanascimento: item.datanascimento,
      })}
    >
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.nome}>Telefone: {item.telefone}</Text>
      <Text style={styles.nome}>Nascimento: {item.datanascimento}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pacientes</Text>
      <View style={[styles.Inf, { paddingTop: 10 }]}>
        {loading ? (
          <ActivityIndicator size={50} color="#34C759" />
        ) : (
          <FlatList
            data={paciente}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => 
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("Paciente", {
                  idu: id,
                  id: item.id,
                  nome: item.nome,
                  email: item.email,
                  telefone: item.telefone,
                  datanascimento: item.datanascimento,
                  nomep: nomep,
                })}
              >
                <View style={{flexDirection: 'row'}}>
                  <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }} style={styles.avatar}/>
                  <View>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.nome}>Telefone: {item.telefone}</Text>
                    <Text style={styles.nome}>Nascimento: {item.datanascimento}</Text>
                  </View>
                </View>
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
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    backgroundColor: '#fff',
    color: '#000',
    height: 40,
    justifyContent: 'center',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    marginHorizontal: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 70,
    backgroundColor: "#e7fbe6",
    marginRight: 5
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
      backgroundColor: '#fff',
      height: '100%',
  },
});
