import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions, ScrollView } from "react-native";
import { getUrl } from "@/app/utils/url";
import axios from "axios";

interface Chat {
  id: number;
  idpaci: number;
  idpro: number;
}
interface NumeroP {
  id: number;
  idprof: number;
  idpac: number;
}

export default function Perfil01({ navigation, route }) {
  const { width } = useWindowDimensions();

  const {
    idu, nomeu, telefoneu, emailu, passwordu, datanascimentou, generou,
    id, nome, email, telefone, datanascimento, experiencia, areaTrabalho
  } = route.params;

  const CriarConversa = async () => {
    try {
      const chats = await (await axios.get<Chat[]>(`${getUrl()}/MindCare/API/chats`)).data;
      const numerops = await (await axios.get<NumeroP[]>(`${getUrl()}/MindCare/API/numeroP`)).data;
      const numeropExistente = numerops.find((numeroP: NumeroP) => numeroP.idpac === idu && numeroP.idprof === id);
      const chatExistente = chats.find((chat: Chat) => chat.idpaci === idu && chat.idpro === id);

      if (chatExistente) {
        navigation.navigate('Mensagem', {
        idchats: chatExistente.id,
        nome,
        id: idu
        });
      } else {
        const response = await axios.post(`${getUrl()}/MindCare/API/chats`, {
          idpaci: idu,
          idpro: id
        });
        if(!numeropExistente)
        {
          await axios.post(`${getUrl()}/MindCare/API/numeroP`, {
            idprof: id,
            idpac: idu
          });
        }
        navigation.navigate('Mensagem', {
          idchats: response.data.id,
          nome,
          id: idu
        });
      }
    } catch (error) {
      console.error("Erro ao criar ou buscar chat:", error);
    }
  };

  const CriarConsulta = () => {
    navigation.navigate('MarcarConsulta', {
      idpaci: idu,
      idpro: id,
      nome: nome,
      nomep: nomeu,
      telefone: telefone,
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#EEF3F8' }}>
      <View style={styles.header}/>

      <View style={[styles.card]}>
        <Image
          source={require('../../assets/images/person.png')}
          style={styles.avatar}
        />

        <View style={[styles.infoContainer]}>
          <Text style={styles.name}>{nome}</Text>
          <Text style={styles.text}>Especialidade: {areaTrabalho}</Text>
          <Text style={styles.text}>{experiencia} ano(s) de experiência</Text>
          <Text style={styles.text}>Email: {email}</Text>
          <Text style={styles.text}>Telefone: {telefone}</Text>

          <View style={[styles.buttons]}>
            <TouchableOpacity style={styles.button} onPress={CriarConversa}>
              <Text style={styles.buttonText}>Enviar Mensagem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={CriarConsulta}>
              <Text style={styles.buttonText}>Marcar Consulta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 150,
    backgroundColor: '#C3D5DC',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: -75,
    zIndex: -1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginHorizontal: 20,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#e7fbe6",
    alignSelf: 'center',
  },
  infoContainer: {
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginVertical: 2,
    textAlign: 'center'
  },
  buttons: {
    marginTop: 20,
    gap: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 5
  },
  button: {
    backgroundColor: '#4CD964',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500'
  }
});
