import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Platform,useWindowDimensions} from "react-native";
import axios from "axios";
import { getUrl } from "@/app/utils/url";

interface ConversaItem {
  id: number;
  nome: string;
  ultimaMensagem: string;
  hora: string;
}

export default function Conversa({ navigation, route }) {
  const { id } = route.params;
  const [conversas, setConversas] = useState<ConversaItem[]>([]);
  const [sos, setSos] = useState("");

  const fetchConversas = async () => {
    try {
        const res = await axios.get(`${getUrl()}/MindCare/API/chats/idpro/${id}`);
        const chats = res.data;
        if (!chats || chats.length === 0) {
          setSos("Nenhuma conversa encontrada. Espere o contacto de um paciente para comecar a interação.");
          setConversas([]);
          return;
        }

        const conversasFormatadas = await Promise.all(
        chats.map(async (chat: { idpaci: any; id: any; }) => {
          try {
            const pacientesResponse = await axios.get(`${getUrl()}/MindCare/API/pacientes/${chat.idpaci}`);
            const pacientes = pacientesResponse.data;
            const usuarioResponse = await axios.get(`${getUrl()}/MindCare/API/users/${pacientes.id}`);
            const usuario = usuarioResponse.data;

            const mensagemResponse = await axios.get(`${getUrl()}/MindCare/API/mensagens/idchat/${chat.id}`);
            const mensagens = mensagemResponse.data;
            const ultimaMensagem = mensagens.length > 0 ? mensagens[mensagens.length - 1] : null;

            return {
              id: chat.id,
              nome: usuario.nome,
              ultimaMensagem: ultimaMensagem ? ultimaMensagem.conteudo : "Nenhuma mensagem",
              hora: ultimaMensagem ? ultimaMensagem.hora?.substring(0, 5) : "",
            };
          } catch (error) {
            console.error(`Erro ao processar chat ${chat.id}:`, error);
            return {
              id: chat.id,
              nome: "Desconhecido",
              ultimaMensagem: "Erro ao carregar",
              hora: "",
            };
          }
        })
      );

      setConversas(conversasFormatadas);
    } catch (error) {
      console.error("Erro ao buscar conversas:", error);
    }
  };

  useEffect(() => {
    fetchConversas();
    const intervalo = setInterval(fetchConversas, 1000);
    return () => clearInterval(intervalo);
  }, [id]);
  return (
    <View style={styles.container}>
      <Text style={{backgroundColor: '#4CD964', color: '#20613d', fontSize: 15, textAlign: 'center'}}>{sos}</Text>
      <FlatList
        style={styles.Inf}
        data={conversas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const content = (
            <TouchableOpacity
              style={styles.pessoa}
              onPress={() => navigation.navigate("Mensagem", { idchats: item.id, nome: item.nome, id })}>
                <Text style={[styles.textp, { color: "#20613d", fontSize: 19 }]}>{item.nome}</Text>
                <Text style={[styles.textp, { color: "#e6e6e6" }]}>{item.ultimaMensagem}</Text>
                <Text style={[styles.textp, { color: "#e6e6e6", fontSize: 12, textAlign: "right" }]}>
                  {item.hora}
                </Text>
            </TouchableOpacity>
          );
          return content;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CD964",
  },
  pessoa: {
    padding: 10,
    backgroundColor: "#fff",
    height: 80,
    borderRadius: 20,
    marginTop: 5,
    marginHorizontal: 5,
    alignSelf: 'center',
    width: '98%'
  },
  textp: {
    fontSize: 15,
    color: "#4CD964" 
  },
  Inf: {
    backgroundColor: "#4CD964",
  },
});