import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image, Alert,} from "react-native";
import axios from "axios";
import { getUrl } from "@/app/utils/url";
import { CommonActions } from "@react-navigation/native";

interface ConversaItem {
  id: number;
  nome: string;
  ultimaMensagem: string;
  hora: string;
}

export default function Conversa({ navigation, route }) {
  const { id, nome, telefone, email, password, datanascimento, genero } = route.params;
  const [conversas, setConversas] = useState<ConversaItem[]>([]);

  const fetchConversas = async () => {
    try {
      const res = await axios.get(`${getUrl()}/MindCare/API/chats/idpaci/${id}`);
      const chats = res.data;
      if (!chats || chats.length === 0) {
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

  const profissional = () =>{
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{
          name: 'Navegacao',
          params: {
            id: id,
            nome: nome,
            telefone: telefone,
            email: email,
            password: password,
            datanascimento: datanascimento,
            genero: genero,
          },
        },],
      })
    );
  }
  const ApagarConversa = async (idchat: number) => {
    try{
      await axios.delete(`${getUrl()}/MindCare/API/mensagens/chat/${idchat}`)
      await axios.delete(`${getUrl()}/MindCare/API/chats/${idchat}`)
    }catch(error){
      console.log("impossivel deletar: "+error);
    }
  }

  useEffect(() => {
    fetchConversas();
    const interval = setInterval(fetchConversas, 1000);
    return () => clearInterval(interval);
  }, [id]);
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Conversas</Text>
        <FlatList
          style={styles.Inf}
          data={conversas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const content = (
              <TouchableOpacity style={styles.pessoa} onPress={() => navigation.navigate("Mensagem", { idchats: item.id, nome: item.nome, id })}  onLongPress={() => {
                Alert.alert(
                  "Apagar conversa",
                  "Tem certeza que deseja apagar esta conversa?",
                  [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Apagar", style: "destructive", onPress: ()=> ApagarConversa(item.id)}
                  ],
                  { cancelable: true }
                );
              }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={require('../../assets/images/person.png')} style={styles.avatar}/>
                  <View>
                    <Text style={[styles.textp, { color: "#fff", fontSize: 19 }]}>{item.nome}</Text>
                    <Text style={[styles.textp, { color: "#E4E4E5" }]}>{item.ultimaMensagem}</Text>
                    <Text style={[styles.textp, { color: "#E4E4E5", fontSize: 12}]}>{item.hora}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
            return content;
          }}
        />
        {conversas.length === 0 && (
          <View style={{ alignItems: 'center', position: 'absolute', top: 200}}>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              Sem conversas disponíveis. Vá até a aba "Áreas e Profissionais" e entre em contacto com um profissionail para começar a usar nossos serviços.
            </Text>
            <TouchableOpacity onPress={profissional}>
              <Text style={{ color: '#20613d', fontWeight: 'bold' }}>Ir para a aba Área e Profissionais</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

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
  pessoa: {
    backgroundColor: "#4CD964",
    height: 65,
    borderRadius: 20,
    marginHorizontal: 5,
    alignSelf: 'center',
    width: '97%',
    marginTop: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 70,
    backgroundColor: "#e7fbe6",
    marginHorizontal: 5
  },
  textp: {
    fontSize: 15,
    color: "#4CD964" 
  },
  Inf: {
    backgroundColor: "#fff",
  },
});