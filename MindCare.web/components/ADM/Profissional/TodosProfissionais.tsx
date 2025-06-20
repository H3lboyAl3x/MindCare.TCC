import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform, ScrollView , Image} from "react-native";
import axios from "axios";
import { getUrl } from "@/app/utils/url";
import { LinearGradient } from "expo-linear-gradient";

interface Profissional { 
    id: number; 
    tempoexperiencia: number; 
}
interface Usuario { 
    id: number; 
    nome: string; 
    email: string; 
    telefone: string; 
    datanascimento: string;
    genero: string; 
}
interface ProfissionalComNome {
    id: number; 
    nome: string; 
    email: string; 
    telefone: string;
    datanascimento: string; 
    genero: string;
    tempoexperiencia: number;
    areaT: string;
}
interface AreaTrabalho { 
    id: number; 
    area: string; 
}
interface AreaProf { 
    id: number; idprof: 
    number; idarea: number; 
}


export default function TodosProfissionais({ navigation, route }) {
  const { id, email, password } = route.params;
  const [profissionais, setProfissionais] = useState<ProfissionalComNome[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  const Listafuncionario = async () => {
    try {
      const response = await axios.get<Profissional[]>(`${getUrl()}/MindCare/API/profissionais`);
      const listaProfissionais = response.data;

      const profissionaisComNomes: ProfissionalComNome[] = await Promise.all(
        listaProfissionais.map(async (profissional) => {
          try {
            const userResponse = await axios.get<Usuario>(getUrl() + "/MindCare/API/users/" + profissional.id);
            const areapResponse = await axios.get<AreaProf>(`${getUrl()}/MindCare/API/areaprof/idpro/${profissional.id}`);
            const AreaP = areapResponse.data;
            const areatResponse = await axios.get<AreaTrabalho>(`${getUrl()}/MindCare/API/areatrabalho/${AreaP.idarea}`);
            return {
              id: profissional.id,
              nome: userResponse.data.nome,
              email: userResponse.data.email,
              telefone: userResponse.data.telefone,
              datanascimento: userResponse.data.datanascimento ? userResponse.data.datanascimento.toString().split("T")[0] : "",
              genero: userResponse.data.genero,
              tempoexperiencia: profissional.tempoexperiencia,
              areaT: areatResponse.data.area,
            };
          } catch {
            return {
              id: profissional.id,
              nome: "Desconhecido", 
              email: "Desconhecido", 
              telefone: "Desconhecido",
              datanascimento: "Desconhecido",
              genero: "Desconhecido",
              tempoexperiencia: 0,
              areaT: "Desconhecida", 
            };
          }
        })
      );

      setProfissionais(profissionaisComNomes);
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Listafuncionario();
    const intervalo = setInterval(Listafuncionario, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const renderProfissional = (item: ProfissionalComNome) => (
    <TouchableOpacity style={[styles.card, {width: 230}]} onPress={() => navigation.navigate('ExibirInformacaop', {
        id: item.id,
        nome: item.nome,
        telefone: item.telefone,
        email: item.email,
        datanascimento: item.datanascimento,
        genero: item.genero,
        espe: item.areaT,
        expe: item.tempoexperiencia,
        idadm: id,
        emailadm: email,
        passwordadm: password
      })}>
        <Image source={require('../../../assets/images/person.png')} style={styles.avatar}/>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.nome}>Área: {item.areaT}</Text>
        <Text style={styles.nome}>Experiência: {item.tempoexperiencia} anos</Text>
    </TouchableOpacity>
  );

  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Image source={require('../../../assets/images/trevo.jpg')} style={styles.mainImage} />
          <Text style={styles.title}>Bem-vindo ao Espaço Gaya</Text>
          <TouchableOpacity style={{ marginLeft: 'auto', paddingRight: 5 }} onPress={() => navigation.navigate('CriarConta01p', {idad: id, emailad: email, passwordad: password})}>
            <LinearGradient colors={['#2E8B57', '#4CD964']} style={[styles.button]}>
              <Text style={styles.buttonText}>Registrar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{flexDirection: "row",flexWrap: "wrap",padding: 10,}}>
          {loading ? (
            <View style={{ flex: 1, marginTop: 50 }}>
              <ActivityIndicator size={50} color="#34C759" />
            </View>
          ) : profissionais.length === 0 ? (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 50 }}>
              <Text style={{ fontSize: 16, textAlign: "center", color: "#333", maxWidth: 400 }}>
                Nenhum profissional foi registrado ainda.
                {"\n\n"}Para adicionar um novo profissional, clique no botão <Text style={{ fontWeight: 'bold' }}>"Registrar"</Text> no canto superior direito.
              </Text>
            </View>
          ) : (
            profissionais.map((item) => (
              <View key={item.id} style={{ width: 250, margin: 10 }}>
                {renderProfissional(item)}
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