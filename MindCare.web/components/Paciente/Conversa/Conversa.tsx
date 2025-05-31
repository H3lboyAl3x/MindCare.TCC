import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Image,
} from "react-native";
import axios from "axios";
import { getUrl } from "@/app/utils/url";
import Mensagem from "@/components/Mensagem/Mensagem";

interface ConversaItem {
  id: number;
  nome: string;
  ultimaMensagem: string;
  hora: string;
}

interface NumeroP {
    id: number;
    idprof: number;
    idpac: number;
}

export default function Conversa({ navigation, route }) {
  const { id } = route.params;
  const [conversas, setConversas] = useState<ConversaItem[]>([]);
  const [chatSelecionado, setChatSelecionado] = useState<ConversaItem | null>(null);
  const isWeb = Platform.OS === "web";
  const { width } = useWindowDimensions();
  const [sos, setSos] = useState('');
  const [idprof, setIdprof] = useState(null);

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
            setIdprof(prof.data.id);
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

  const renderConversas = () => {
    if (conversas.length === 0) {
      return (
        <View>
          <Image
            source={{
              uri: "https://aebo.pt/wp-content/uploads/2024/05/spo-300x300.png",
            }}
            style={styles.logo}
          />
          <Text style={{ textAlign: "center", marginTop: 30, color: Platform.OS === 'web'? "#000" : "#fff" }}>{sos}</Text>
        </View>
      );
    }
    return (
      <FlatList
        style={styles.Inf}
        data={conversas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const content = (
            <TouchableOpacity
              style={styles.pessoa}
              onPress={() =>
                isWeb
                  ? setChatSelecionado(item)
                  : navigation.navigate("Mensagem", { idchats: item.id, nome: item.nome, id })
              }
            >
              <Text style={[styles.textp, { color: "#fff" }]}>{item.nome}</Text>
              <Text style={[styles.textp, { color: "#e6e6e6" }]}>{item.ultimaMensagem}</Text>
              <Text style={[styles.textp, { color: "#e6e6e6", fontSize: 12, textAlign: "right" }]}>
                {item.hora}
              </Text>
            </TouchableOpacity>
          );

          if (isWeb) {
            return (
              <div
                onContextMenu={(e) => {
                  e.preventDefault();
                }}
              >
                {content}
              </div>
            );
          }

          return content;
        }}
      />
    );
  };

  const renderMensagemWeb = () => (
    <View style={{ flex: 1, backgroundColor: "#e3e6e3" }}>
      {chatSelecionado ? (
        <Mensagem route={{ params: { idchats: chatSelecionado.id, nome: chatSelecionado.nome, id: id } }} />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Selecione uma conversa para visualizar as mensagens usando o botão esquerdo ou exclua-a utilizando o botão direito.
        </Text>
      )}
    </View>
  );

  if (Platform.OS === "web") {
    return (
      <View style={[styles.container, { marginTop: 60 }]}>
        {isWeb && width > 768 ? (
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ width: "25%",borderRightWidth: 2, borderColor: '#4CD964' }}>{renderConversas()}</View>
            {renderMensagemWeb()}
          </View>
        ) : (
          renderConversas()
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? "#fff" : "#2E8B57",
  },
  titulo: {
    fontSize: 25,
    marginBottom: 10,
    backgroundColor: "#4CD964",
    color: "#fff",
    height: 40,
    textAlign: "center",
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 20,
    backgroundColor: "#e7fbe6",
    marginTop: 50,
    alignSelf: "center",
  },
  pessoa: {
    padding: 15,
    backgroundColor: "#4CD964",
    height: 80,
    borderRadius: 20,
    marginTop: 5,
    marginHorizontal: 5,
  },
  textp: {
    fontSize: 15,
  },
  Inf: {
    backgroundColor: Platform.OS === 'web' ? "#fff" : "#2E8B57",
  },
});