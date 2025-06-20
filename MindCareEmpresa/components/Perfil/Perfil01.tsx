import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { getUrl } from "@/app/utils/url";
import axios from "axios";

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

  //Buscar as consultas e pacientes
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
      <Text style={styles.titulo}>Perfil</Text>
      <View style={styles.header}/>
      <View style={styles.card}>
        <View>
          <Image source={require('../../assets/images/person.png')} style={styles.avatar}/>
          <View style={[styles.infoContainer]}>
            <Text style={styles.name}>{nome}</Text>
            <Text style={[styles.name, {fontSize: 13}]}>{espe}</Text>
            <Text style={[styles.name, {fontSize: 13}]}>{expe}</Text>
          </View>
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
            <Text style={{color: '#c0c0c0',}}>Ver Detalhes</Text>
          </TouchableOpacity>
        </View>
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
            <View style={styles.card1}>
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
             style={styles.card1}
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
        backgroundColor: '#EEF3F8',
    },
    titulo: {
        fontSize: 25,
        backgroundColor: '#EEF3F8',
        color: '#000',
        height: 40,
        justifyContent: 'center',
        fontWeight: 'bold',
        borderBottomWidth: 1,
        marginHorizontal: 5,
    },
    header: {
        height: 100,
        backgroundColor: '#C3D5DC',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginBottom: -75,
        zIndex: -1,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
        marginTop: 0,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: "#e7fbe6",
        alignSelf: 'center',
    },
    infoContainer: {
        marginTop: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    encrenagem: {
        alignSelf: 'center',
    },
    Menu: {
        marginTop: 10,
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
    card1: {
        padding: 5,
        backgroundColor: "#4CD964",
        height: 70,
        borderRadius: 20,
        marginTop: 5,
        marginHorizontal: 5,
    },
    text: {
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 15,
    },
    nome: {
        fontSize: 13,
        fontWeight: "bold",
        color: '#fff',
    },
});