import React, { useEffect, useRef, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity,ActivityIndicator, Platform, ScrollView,Animated,Dimensions,Image} from "react-native";
import axios from "axios";
import { getUrl } from "@/app/utils/url";
import { Ionicons } from "@expo/vector-icons";

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
}
interface ProfissionalComNome {
  id: number; 
  nome: string; 
  email: string; 
  telefone: string;
  datanascimento: string; 
  areaT: string; 
  tempoexperiencia: number;
}
interface AreaTrabalho { 
  id: number; 
  area: string; 
}
interface AreaProf { 
  id: number; idprof: 
  number; idarea: 
  number; 
}
interface NumeroP { 
  id: number; 
  idprof: number; 
  idpac: number; 
}

export default function Profissionais({ navigation, route }) {
  const { idu, nomeu, telefoneu, emailu, passwordu, datanascimentou, generou } = route.params;
  const [profissionais, setProfissionais] = useState<ProfissionalComNome[]>([]);
  const [especialidades, setEspecialidades] = useState<AreaTrabalho[]>([]);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [expandido, setExpandido] = useState(false)
  const widthAnim = useRef(new Animated.Value(Platform.OS === 'web' ? 5 : 25)).current;
  const expandir = () => {
    Animated.timing(widthAnim, {
      toValue: Dimensions.get("window").width < 600 ? 50: 25,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setExpandido(true)
  };

  const reduzir = () => {
    Animated.timing(widthAnim, {
      toValue: Dimensions.get("window").width < 600 ? 10: 5,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setExpandido(false)
  };

  const Listafuncionario = async () => {
    try {
      const response = await axios.get<Profissional[]>(`${getUrl()}/MindCare/API/profissionais`);
      const listaProfissionais = response.data;

      const response1 = await axios.get<AreaTrabalho[]>(`${getUrl()}/MindCare/API/areatrabalho`);
      const listaEspecialidades = response1.data;
      const especialidadesUnicas = listaEspecialidades.filter((item, index, self) =>
        index === self.findIndex((t) => t.area === item.area)
      );
      setEspecialidades(especialidadesUnicas);

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
              areaT: areatResponse.data.area,
              tempoexperiencia: profissional.tempoexperiencia || 0,
            };
          } catch {
            return {
              id: profissional.id,
              nome: "Desconhecido", email: "Desconhecido", telefone: "Desconhecido",
              datanascimento: "Desconhecido", areaT: "Desconhecida", tempoexperiencia: 0
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
  const profissionaisFiltrados = profissionais.filter((profissional) =>
    especialidadeSelecionada === null || profissional.areaT === especialidades.find(e => e.id === especialidadeSelecionada)?.area
  );

  useEffect(() => {
    Listafuncionario();
    const intervalo = setInterval(Listafuncionario, 1000);
    return () => clearInterval(intervalo);
  }, [idu]);

  const renderProfissional = (item: ProfissionalComNome) => (
    <TouchableOpacity style={[styles.card, {width: 230}]} onPress={() => navigation.navigate("Proficional", {
      idu: idu, nomeu: nomeu, telefoneu: telefoneu, emailu:emailu, passwordu: passwordu, datanascimentou: datanascimentou, generou: generou , id: item.id, nome: item.nome, email: item.email,
      telefone: item.telefone, datanascimento: item.datanascimento,
      experiencia: item.tempoexperiencia, areaTrabalho: item.areaT
    })}>
      <Image source={require('../../../assets/images/person.png')} style={styles.avatar}/>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.nome}>Área: {item.areaT}</Text>
      <Text style={styles.nome}>Experiência: {item.tempoexperiencia} anos</Text>
    </TouchableOpacity>
  );

  if (Platform.OS === "web") {
    return (
      <View style={{ flex: 1, flexDirection: "row", height: "100%"}}>
        <Animated.View
          style={{
            width: widthAnim.interpolate({
              inputRange: [5, 25],
              outputRange: ['5%', '25%'],
            }),
            backgroundColor: '#dbdbdb',
            borderRightWidth: 1,
            borderColor: '#8c8c8c',
            paddingTop: 70,
          }}
          {...(Platform.OS === 'web'
            ? {
                onMouseEnter: expandir,
                onMouseLeave: reduzir,
              }
            : {}) as any}>
          {expandido ? <Text style={styles.especialidades}>Especialidades</Text> : <Ionicons style={{alignSelf: 'center'}} name="medical-outline" size={24} color="#2E8B57" />}
          {especialidades.map((item) => (
            <TouchableOpacity style={{ marginBottom: 10, backgroundColor:'#4CD964', width:'90%', height: 50, borderRadius: 25, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }} key={item.id} onPress={() => setEspecialidadeSelecionada(item.id)}>
              {expandido ? <Text style={{ marginVertical: 4, color:'#fff' }}>{item.area}</Text> : <Ionicons style={{alignSelf: 'center'}} name="briefcase-outline" size={24} color="#fff" />}
            </TouchableOpacity>
          ))}
        </Animated.View >
        <ScrollView contentContainerStyle={{ width: "100%", paddingTop: 60, flexDirection: "row", flexWrap: "wrap" }}>
          {loading ? (
            <ActivityIndicator size={50} color="#34C759" />
          ) : (
            (profissionaisFiltrados).map((item) => (
              <View key={item.id} style={{ width: 230, margin: 5,  alignItems: 'center', justifyContent: 'center'  }}>
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
    alignItems: 'center'
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
  Inf: {
      backgroundColor: '#2E8B57',
      height: '100%',
  },
});
