import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, FlatList, StyleSheet, Platform, Keyboard } 
from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getUrl } from "@/app/utils/url";

interface Mensagem {
  id: number;
  idchat: number;
  remetente: number;
  conteudo: string;
  data: string;
  hora: string;
}

interface SMS {
  id: number;
  remetente: number;
  conteudo: string;
  hora: string;
}

export default function Mensagem({ route }) {
  const { idchats, nome, id } = route.params;

  const [sms, setSms] = useState<SMS[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [data, setdata] = useState("");
  const [hora, sethora] = useState("");

  const pegarData = () => {
    const agora = new Date();
    const dia = agora.getDate().toString().padStart(2, "0");
    const mes = (agora.getMonth() + 1).toString().padStart(2, "0");
    const ano = agora.getFullYear();
    return `${ano}-${mes}-${dia}`;
  };

  const pegarHora = () => {
    const agora = new Date();
    const horas = agora.getHours().toString().padStart(2, "0");
    const minutos = agora.getMinutes().toString().padStart(2, "0");
    return `${horas}:${minutos}`;
  };  

  const buscarMensagens = async () => {
    try {
      const resposta = await axios.get<Mensagem[]>(`${getUrl()}/MindCare/API/mensagens/idchat/${idchats}`);
      const mensagens = resposta.data.map((mens) => ({
        id: mens.id,
        remetente: mens.remetente,
        conteudo: mens.conteudo,
        hora: mens.hora
      }));
      setSms(mensagens);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    }
  };

  useEffect(() => {
    buscarMensagens();
    setdata(pegarData());
    sethora(pegarHora());
    const intervalo = setInterval(buscarMensagens, 1000);
    return () => {
      clearInterval(intervalo);
    }
  }, [idchats]);

  const enviarMensagem = async () => {
    if (!mensagem.trim()) return;
    try {
      await axios.post(`${getUrl()}/MindCare/API/mensagens`, {
        idchat: idchats,
        remetente: id,
        conteudo: mensagem,
        data: pegarData(),
        hora: pegarHora(),
      });
      setMensagem("");
      buscarMensagens();
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.titulo}>
        <Text style={styles.nomep}>{nome}</Text>
      </View>

      <FlatList
        data={sms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.caixasms, { alignSelf: item.remetente === id ? "flex-end" : "flex-start", backgroundColor: item.remetente === id ? "#4CD964" : "#FFFFFF", borderBottomLeftRadius: item.remetente === id ? 15 : 0, borderBottomRightRadius: item.remetente === id ? 0 : 15 }]}>
            <Text style={[styles.textp, { color: item.remetente === id ? "#fff" : "#000" }]}>{item.conteudo}</Text>
            {item.hora && <Text style={[styles.textp, { color: "#757575", fontSize: 12, textAlign: "right" }]}>{item.hora.slice(0, 5)}</Text>}
          </View>
        )}
        contentContainerStyle={styles.flatList}
        keyboardShouldPersistTaps="never"
      />
      <View style={styles.escrever}>
        <TextInput 
          placeholder="Mensagem" 
          style={styles.ti} 
          value={mensagem} 
          onChangeText={setMensagem} 
        />
        <TouchableOpacity style={styles.icon} onPress={enviarMensagem}>
          <Ionicons name="send-outline" size={32} color={"#2E8B57"} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    height: 50,
    justifyContent: 'center',
    width: '98%',
    alignSelf: 'center',
    borderRadius: 25,
  },
  nomep: {
    fontSize: 25,
    marginLeft: 10,
    color: '#fff',
  },
  flatList: {
    flexGrow: 1,
    backgroundColor: Platform.OS === 'web' ? "#dbdbdb" : "#2E8B57",
    paddingHorizontal: 10,
    paddingVertical: 10,

  },
  escrever: {
    height: 80,
    backgroundColor: Platform.OS === 'web' ? "#dbdbdb" : "#2E8B57",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 25,
  },
  ti: {
    height: 50,
    width: "85%",
    backgroundColor: Platform.OS === 'web' ? "#58f573" : "#fff",
    borderRadius: 25,
    paddingHorizontal: 10,
    color: Platform.OS === 'web' ? "#000" : "#000",
  },
  icon: {
    backgroundColor: "#4CD964",
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    borderRadius: 25,
  },
  caixasms: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  textp: {
    fontSize: 15,
  },
});