import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getUrl } from "@/app/utils/url";
import axios from "axios";

// Definindo as interfaces para tipos de dados
interface Consultas {
  id: number;
  data: string;
  hora: string;
  idpaci: number;
  idpro: number;
  status: string;
}

interface Paciente {
  id: number;
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

export default function Perfil01({ navigation, route }) {
  const { id, nome, telefone, email, password, datanascimento, genero, espe, expe } = route.params;
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<"consulta" | "paciente">("consulta");
  const [consultas, setConsultas] = useState<Consultas[]>();
  const [pacienteC, setPacienteC] = useState<PacienteComNome[]>([]);

  // Função para buscar as consultas e pacientes
  const ListaConsulta = async () => {
    try {
      const consultaResponde = await axios.get<Consultas[]>(`${getUrl()}/MindCare/API/consultas`);
      const listaconsulta = consultaResponde.data;
      const consultasUnicas = listaconsulta.filter((consulta) => consulta.idpro === id);
      setConsultas(consultasUnicas);

      const NP = await axios.get<NumeroP[]>(`${getUrl()}/MindCare/API/numeroP/idprof/${id}`);
      const listaPacienteC = NP.data;
      const pacineteComNomesC: PacienteComNome[] = await Promise.all(
        listaPacienteC.map(async (Numero) => {
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
      setPacienteC(pacineteComNomesC);
    } catch (error) {
      console.error("Erro ao buscar consultas: " + error);
    }
  };

  const [cormenu1, setMenu1] = useState('white');
  const [cormenu2, setMenu2] = useState('#EEEEEF');

  useEffect(() => {
    ListaConsulta();
    const intervalo = setInterval(ListaConsulta, 1000);
    return () => clearInterval(intervalo);
  }, [id]);

  const Funcaobotao1 = () => {
    setMenu1('white');
    setMenu2('#EEEEEF');
  };

  const Funcaobotao2 = () => {
    setMenu2('white');
    setMenu1('#EEEEEF');
  };
  return (
    <View style={styles.container}>
      <View style={styles.quadro} />
      <View style={styles.bfoto}>
        <View>
          <Ionicons style={styles.foto} name="person-circle-outline" size={100} color={'black'} />
          <TouchableOpacity
            style={styles.encrenagem}
            onPress={() => navigation.navigate('ExibirInformacaop', {
                id: id,
                nome: nome,
                telefone: telefone,
                email: email,
                password: password,
                datanascimento: datanascimento,
                genero: genero,
                espe: espe, 
                expe: expe, 
            })}>
            <Ionicons style={{ backgroundColor: 'white', borderRadius: 50 }} name="ellipsis-horizontal-circle-outline" size={40} color={'black'} />
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: 'center', fontSize: 17 }}>{nome}</Text>
        <Text style={{ textAlign: 'center', fontSize: 13 }}>{espe}</Text>
      </View>
      <View style={styles.Menu}>
        <TouchableOpacity style={[styles.menu1, { backgroundColor: cormenu1 }]} onPress={() => { Funcaobotao1(); setOpcaoSelecionada('consulta'); }}>
          <Text style={styles.text}>Lista de consultas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menu2, { backgroundColor: cormenu2 }]} onPress={() => { Funcaobotao2(); setOpcaoSelecionada('paciente'); }}>
          <Text style={styles.text}>Lista de Pacientes</Text>
        </TouchableOpacity>
      </View>
      {opcaoSelecionada === "consulta" && (
        <FlatList
          data={consultas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={[styles.nome, { fontSize: 16 }]}>Consulta</Text>
              <Text style={styles.nome}>{item.data.toString().split("T")[0]}</Text>
              <Text style={styles.nome}>Estado: {item.status}</Text>
            </View>
          )}
        />
      )}
      {opcaoSelecionada === "paciente" && (
        <FlatList
          data={pacienteC}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
             style={styles.card}
             onPress={() => navigation.navigate('PP', {idp: item.id})}>
              <Text style={[styles.nome, { fontSize: 16 }]}>{item.nome}</Text>
              <Text style={styles.nome}>{item.email}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    quadro: {
        marginTop: 40,
        backgroundColor: '#4CD964',
        width: '95%',
        height: 200,
        alignSelf: 'center',
        borderRadius: 25,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: "#e7fbe6",
    },
    bfoto: {
        position: "absolute", 
        top: 180,
        left: 120,
        width: 115,
        height: 115,
        borderColor: '#4CD964',
        borderWidth: 2,
        borderRadius: 60,
    },
    foto: {
        width: 110,
        height: 110,
        borderRadius: 60,
        borderWidth: 5,
        borderColor: 'white',
        backgroundColor: 'white',
    },
    encrenagem: {
        position: "absolute", 
        top: 35,
        left: 130,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#4CD964'
    },
    Menu: {
        marginTop: 130,
        backgroundColor: '#EEEEEF',
        width: '100%',
        height: 50,
        borderRadius: 10,
        flexDirection: 'row', 
        alignItems: "center", 
        justifyContent: "space-between"
    },
    menu1: {
        marginLeft: 3,
        borderRadius: 10,
        height: '90%',
        width: '50%'
    },
    menu2: {
        marginRight: 40,
        borderRadius: 10,
        height: '90%',
        width: '50%'
    },
    text: {
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 15,
    },
    card: {
        backgroundColor: "#4CD964",
        padding: 10,
        borderRadius: 20,
        marginTop: 5,
        marginHorizontal: 5,
    },
    nome: {
        fontSize: 13,
        fontWeight: "bold",
        color: '#fff',
    },
    profileHeader: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        marginTop: -50,
        marginHorizontal: 'auto',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileInfo: {
        marginLeft: 20,
    },
    profileName: {
        fontSize: 24,
    },
    editIcon: {
        marginTop: 10,
    },
});