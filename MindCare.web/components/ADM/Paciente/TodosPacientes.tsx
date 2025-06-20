import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image } from "react-native";
import axios from "axios";
import { getUrl } from "@/app/utils/url";
import { LinearGradient } from "expo-linear-gradient";

interface Paciente {
  id: number;
}
interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  datanascimento: string;
  genero: string;
}
interface PacienteComNome {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  datanascimento: string;
  genero: string;
}

export default function TodosPacientes({ navigation, route }) {
  const { id, email, password } = route.params;
  const [paciente, setPaciente] = useState<PacienteComNome[]>([]);


  const Listaclientes = async () => {
    try {
        const paciente = await axios.get<Paciente[]>(`${getUrl()}/MindCare/API/pacientes`);
        const listaPacientes = paciente.data;

        const pacienteComNomes: PacienteComNome[] = await Promise.all(
            listaPacientes.map(async (Numero) => {
            try {
                const userResponse = await axios.get<Usuario>(`${getUrl()}/MindCare/API/users/${Numero.id}`);
                return {
                id: Numero.id,
                nome: userResponse.data.nome,
                email: userResponse.data.email,
                telefone: userResponse.data.telefone,
                datanascimento: userResponse.data.datanascimento ? userResponse.data.datanascimento.split("T")[0] : "",
                genero: userResponse.data.genero,
                };
            } catch (error) {
                console.error(`Erro ao buscar paciente ${Numero.id}:`, error);
                return {
                id: Numero.id,
                nome: "Desconhecido",
                email: "Desconhecido",
                telefone: "Desconhecido",
                datanascimento: "Desconhecido",
                genero: "Desconhecido",
                };
            }
            })
        );

      setPaciente(pacienteComNomes);
    } catch (error) {
      alert("Erro ao buscar pacientes:");
    }
  };

  useEffect(() => {
    Listaclientes();
    const intervalo = setInterval(Listaclientes, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const renderPaciente = (item: PacienteComNome) => (
    <TouchableOpacity
      style={[styles.card, {width: 230}]}
      onPress={() => navigation.navigate("ExibirInformacao", {
        id: item.id,
        nome: item.nome,
        telefone: item.telefone,
        email: item.email,
        datanascimento: item.datanascimento,
        genero: item.genero,
        idadm: id,
        emailadm: email,
        passwordadm: password,
      })}
    >
      <Image source={require('../../../assets/images/person.png')} style={styles.avatar}/>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.nome}>Telefone: {item.telefone}</Text>
      <Text style={styles.nome}>Data de Nascimento: {item.datanascimento}</Text>
    </TouchableOpacity>
  );

  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        
        <View style={styles.header}>
            <Image source={require('../../../assets/images/trevo.jpg')} style={styles.mainImage} />
            <Text style={styles.title}>Bem-vindo ao Espaço Gaya</Text>
            <TouchableOpacity style={{ marginLeft: 'auto', paddingRight: 5}} onPress={() => navigation.navigate('CriarConta01', {idad: id, emailad: email, passwordad: password})}>
                <LinearGradient colors={['#2E8B57', '#4CD964']} style={[styles.button]}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
       
       {/* Lista em grid com rolagem vertical */}
      <ScrollView contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", padding: 10}}>
        {paciente.length === 0 ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 50 }}>
            <Text style={{ fontSize: 16, textAlign: "center", color: "#333", maxWidth: 400 }}>
              O sistema ainda não possui nenhum paciente registrado.
              {"\n\n"}Para adicionar um novo paciente, clique no botão <Text style={{ fontWeight: 'bold' }}>"Registrar"</Text> no canto superior direito da tela.
            </Text>
          </View>
        ) : (
          paciente.map((item) => (
            <View key={item.id} style={{ width: 250, margin: 10 }}>
              {renderPaciente(item)}
            </View>
          ))
        )}
      </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    flexDirection: 'row',
    backgroundColor: '#20613d',
    width: '100%',
    height: 60,
  },
  mainImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CD964",
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#4CD964",
    borderRadius: 5,
    alignSelf: 'flex-end',
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#4CD964",
    padding: 10,
    borderRadius: 20,
    marginBottom: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 70,
    backgroundColor: "#e7fbe6",
    marginRight: 5
  },
  nome: {
    fontSize: 12,
    fontWeight: "bold",
    color: '#fff'
  },
});