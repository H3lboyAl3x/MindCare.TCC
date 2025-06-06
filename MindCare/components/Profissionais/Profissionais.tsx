import React, { useEffect, useRef, useState } from "react";
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  ActivityIndicator, Platform, ScrollView,
  Animated
  as RNView,
  Animated,
  Dimensions
} from "react-native";
import axios from "axios";
import { getUrl } from "@/app/utils/url";

interface Profissional { id: number; tempoexperiencia: number; }
interface Usuario { id: number; nome: string; email: string; telefone: string; datanascimento: string; }
interface ProfissionalComNome {
  id: number; nome: string; email: string; telefone: string;
  datanascimento: string; areaT: string; tempoexperiencia: number;
}
interface AreaTrabalho { id: number; area: string; }
interface AreaProf { id: number; idprof: number; idarea: number; }
interface NumeroP { id: number; idprof: number; idpac: number; }

export default function Profissionais({ navigation, route }) {
  const { idu, nomeu, telefoneu, emailu, passwordu, datanascimentou, generou } = route.params;
  const [profissionais, setProfissionais] = useState<ProfissionalComNome[]>([]);
  const [profissionaisC, setProfissionaisC] = useState<ProfissionalComNome[]>([]);
  const [especialidades, setEspecialidades] = useState<AreaTrabalho[]>([]);
  const [tempex, settempex] = useState(Number);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mostrarProfissionaisC, setMostrarProfissionaisC] = useState(true);

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

      const NP = await axios.get<NumeroP[]>(`${getUrl()}/MindCare/API/numeroP/idpac/${idu}`);
      const listaProfissionaisC = NP.data;

      const profissionaisComNomesC: ProfissionalComNome[] = await Promise.all(
        listaProfissionaisC.map(async (Numero) => {
          try {
            const proResponse = await axios.get<Profissional>(`${getUrl()}/MindCare/API/profissionais/${Numero.idprof}`);
            settempex(proResponse.data.tempoexperiencia || 0);
            const userResponse = await axios.get<Usuario>(getUrl() + "/MindCare/API/users/" + proResponse.data.id);
            const areapResponse = await axios.get<AreaProf>(`${getUrl()}/MindCare/API/areaprof/idpro/${proResponse.data.id}`);
            const AreaP = areapResponse.data;
            const areatResponse = await axios.get<AreaTrabalho>(`${getUrl()}/MindCare/API/areatrabalho/${AreaP.idarea}`);
            return {
              id: Numero.idprof,
              nome: userResponse.data.nome,
              email: userResponse.data.email,
              telefone: userResponse.data.telefone,
              datanascimento: userResponse.data.datanascimento ? userResponse.data.datanascimento.toString().split("T")[0] : "",
              areaT: areatResponse.data.area,
              tempoexperiencia: proResponse.data.tempoexperiencia || tempex,
            };
          } catch {
            return {
              id: Numero.idprof,
              nome: "Desconhecido", email: "Desconhecido", telefone: "Desconhecido",
              datanascimento: "Desconhecido", areaT: "Desconhecida", tempoexperiencia: tempex
            };
          }
        })
      );

      setProfissionais(profissionaisComNomes);
      setProfissionaisC(profissionaisComNomesC);
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
    } finally {
      setLoading(false);
    }
  };

  const profissionaisFiltrados = profissionais.filter((profissional) =>
    especialidadeSelecionada === null || profissional.areaT === especialidades.find(e => e.id === especialidadeSelecionada)?.area
  );
  const profissionaisCFiltrados = profissionaisC.filter((profissional) =>
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
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.nome}>Área: {item.areaT}</Text>
      <Text style={styles.nome}>Experiência: {item.tempoexperiencia} anos</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Profissionais</Text>
      <View style={styles.Inf}>
        {/* Especialidades */}
        <Text style={styles.especialidades}>Especialidades</Text>
        <View>
          <FlatList
            data={especialidades}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            contentContainerStyle={styles.scrollEspecialidades}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.bolinhaContainer} onPress={() => setEspecialidadeSelecionada(item.id)}>
                <View style={styles.bolinha} />
                <Text style={styles.textoEspecialidade}>{item.area}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Profissionais */}
        <View>
          <Text style={styles.Textpro}>Profissionais que ja o acompanham</Text>
          {loading ? (
            <ActivityIndicator size={50} color="#34C759" />
          ) : (
            <FlatList
              data={profissionaisCFiltrados}
              keyExtractor={(item) => `${item.id}-${item.nome}-${item.areaT}`}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Proficional", {
                  idu: idu, nomeu: nomeu, telefoneu: telefoneu, emailu:emailu, passwordu: passwordu, datanascimentou: datanascimentou, generou: generou ,
                  id: item.id,
                  nome: item.nome,
                  email: item.email,
                  telefone: item.telefone,
                  datanascimento: item.datanascimento,
                  experiencia: item.tempoexperiencia,
                  areaTrabalho: item.areaT,
                })}>
                  <Text style={[styles.nome, {fontSize: 16}]}>{item.nome}</Text>
                  <Text style={styles.nome}>Área: {item.areaT}</Text>
                  <Text style={styles.nome}>Experiência: {item.tempoexperiencia} anos</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* Profissionais */}
        <View>
          <Text style={styles.Textpro}>Outros Profissionais</Text>
          {loading ? (
            <ActivityIndicator size={50} color="#34C759" />
          ) : (
            <FlatList
              data={profissionaisFiltrados}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Proficional", {
                  idu: idu, nomeu: nomeu, telefoneu: telefoneu, emailu:emailu, passwordu: passwordu, datanascimentou: datanascimentou, generou: generou ,
                  id: item.id,
                  nome: item.nome,
                  email: item.email,
                  telefone: item.telefone,
                  datanascimento: item.datanascimento,
                  experiencia: item.tempoexperiencia,
                  areaTrabalho: item.areaT,
                })}>
                  <Text style={[styles.nome, {fontSize: 16}]}>{item.nome}</Text>
                  <Text style={styles.nome}>Área: {item.areaT}</Text>
                  <Text style={styles.nome}>Experiência: {item.tempoexperiencia} anos</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
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
