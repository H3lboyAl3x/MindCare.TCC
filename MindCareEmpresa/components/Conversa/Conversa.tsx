import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,FlatList,TouchableOpacity, Image, Alert} from "react-native";
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
        const res = await axios.get(`${getUrl()}/MindCare/API/chats/idpro/${id}`);
        const chats = res.data;
        if (!chats || chats.length === 0) {
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
  const profissional = () =>{
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{
          name: 'Navegacao2',
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
    const intervalo = setInterval(fetchConversas, 1000);
    return () => clearInterval(intervalo);
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
            <TouchableOpacity
              style={styles.pessoa}
              onPress={() => navigation.navigate("Mensagem", { idchats: item.id, nome: item.nome, id })} onLongPress={() => {
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
            Sem conversas disponíveis. Aguarde um paciente entrar em contacto, para começar com o serviço.
          </Text>
          <TouchableOpacity onPress={profissional}>
            <Text style={{ color: '#20613d', fontWeight: 'bold' }}>Ir para a aba Área Pacientes</Text>
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
    alignSelf: 'center',
    width: '97%',
    marginTop: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 70,
    marginHorizontal: 5
  },
  textp: {
    fontSize: 15,
    color: "#fff" 
  },
  Inf: {
    backgroundColor: "#fff",
  },
});