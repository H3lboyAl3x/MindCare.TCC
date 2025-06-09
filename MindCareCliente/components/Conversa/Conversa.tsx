import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Platform,useWindowDimensions,Image,} from "react-native";
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
  const [sos, setSos] = useState('');

  const fetchConversas = async () => {
    try {
      const res = await axios.get(`${getUrl()}/MindCare/API/chats/idpaci/${id}`);
      const chats = res.data;
      if (!chats || chats.length === 0) {
        setSos("Nenhuma conversa encontrada. Acesse a aba 'Profissionais' para iniciar uma nova interação.");
        setConversas([]);
        return;
      }

      const conversasFormatadas = await Promise.all(
        chats.map(async (chat: { idpro: any; id: any; }) => {
          try {
            const prof = await axios.get(`${getUrl()}/MindCare/API/profissionais/${chat.idpro}`);
            const user = await axios.get(`${getUrl()}/MindCare/API/users/${prof.data.id}`);
            const mensagens = await axios.get(`${getUrl()}/MindCare/API/mensagens/idchat/${chat.id}`);
            const lista = mensagens.data;
            const ultima = lista.length > 0 ? lista[lista.length - 1] : null;

            return {
              id: chat.id,
              nome: user.data.nome,
              ultimaMensagem: ultima ? ultima.conteudo : "Nenhuma mensagem",
              hora: ultima ? ultima.hora?.substring(0, 5) : "",
            };
          } catch {
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
    } catch (err) {
      console.error("Erro ao buscar conversas:", err);
    }
  };

  useEffect(() => {
    fetchConversas();
    const interval = setInterval(fetchConversas, 1000);
    return () => clearInterval(interval);
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