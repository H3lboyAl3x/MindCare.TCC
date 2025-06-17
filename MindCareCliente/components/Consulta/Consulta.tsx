import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
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

export default function Consulta({ navigation, route }) {
  const { id } = route.params;
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [selecionada, setSelecionada] = useState<Consulta | null>(null);
  const [nome, setNome] = useState<string | null>(null);

  const pegarData = () => {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
    const dia = agora.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  const buscarConsultas = async () => {
    try {
      const responde = await axios.get<Consulta[]>(`${getUrl()}/MindCare/API/consultas`);
      const consultasseparada = responde.data;
      const consultasfiltrada = consultasseparada.filter(
        (consulta) =>
          consulta.idpaci === id &&
          (consulta.status === "Pendente" || consulta.status === "Adiada")
      );
      setConsultas(consultasfiltrada);
      for (const consulta of consultasfiltrada) {
        if (consulta.data < pegarData() && consulta.status !== 'Completa') {
          await axios.put(`${getUrl()}/MindCare/API/consultas/${consulta.id}`, {
            data: consulta.data,
            hora: consulta.hora,
            idpaci: consulta.idpaci,
            idpro: consulta.idpro,
            status: "Perdida",
            link: '',
          });
        }
      }
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  };

  const pegarprofissional = async (consulta: Consulta) => {
    try {
      const profissional = await axios.get(`${getUrl()}/MindCare/API/profissionais/${consulta.idpro}`);
      const user = await axios.get(`${getUrl()}/MindCare/API/users/${profissional.data.id}`);
      setNome(user.data.nome);
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
    }
  }

  useEffect(() => {
    const carregar = async () => {
      await buscarConsultas();
    };
    carregar();

    const intervalo = setInterval(buscarConsultas, 1000);
    return () => clearInterval(intervalo);
  }, [id]);

  useEffect(() => {
    if (consultas.length > 0) {
      const consultaMaisProxima = consultas.reduce((maisProxima, atual) => {
        return new Date(atual.data) < new Date(maisProxima.data) ? atual : maisProxima;
      });
      setSelecionada(consultaMaisProxima);
      pegarprofissional(consultaMaisProxima);
    }
  }, [consultas]);

  const Analisar = (consulta: Consulta) => {
    navigation.navigate("AnalisarConsultas", {
      idConsulta: consulta.id,
      dataConsulta: consulta.data,
      horaConsulta: consulta.hora,
      idpaci: id,
      idpro: consulta.idpro,
      link: consulta.link,
    });
  };

  const renderLista = () => (
    <>
      {consultas.length === 0 ? (
        <View>
          <Image
            source={{ uri: "https://aebo.pt/wp-content/uploads/2024/05/spo-300x300.png" }}
            style={styles.logo}
          />
          <Text style={{ textAlign: "center", marginTop: 30, color: "#000" }}>
            Marque uma consulta para começar sua jornada de bem-estar!
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.Inf}
          data={consultas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => Analisar(item)}>
              <View>
                <Text style={[styles.consultaText, { fontWeight: "bold", fontSize: 16 }]}>
                  Consulta com: {nome}
                </Text>
                <Text style={styles.consultaText}>
                  Data: {item.data ? item.data.toString().split("T")[0] : ""}
                </Text>
                <Text style={styles.consultaText}>
                  Hora: {item.hora.slice(0, 5)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Consultas</Text>
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
    fontSize: 25,
    backgroundColor: '#fff',
    color: '#000',
    height: 40,
    justifyContent: 'center',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    marginHorizontal: 5,
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
    backgroundColor: "#fff",
  },
});