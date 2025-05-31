import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { getUrl } from "@/app/utils/url";
import { CommonActions } from "@react-navigation/native";

export default function IniciarSessao({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [espaco, setEspaco] = useState("");

  const iniciar = async () => {
    if (!email || !password) {
      setEspaco("Preencha todos os campos antes de continuar.");
      return;
    }

    try {
        const response = await axios.post(`${getUrl()}/MindCare/API/users/login`, { email, password });
        const usuario = response.data;
    
        const formattedDate = usuario.datanascimento
          ? new Date(usuario.datanascimento).toISOString().split("T")[0]
          : null;
    
        try {
          const response2 = await axios.get(`${getUrl()}/MindCare/API/profissionais/${usuario.id}`);
          const profissional = response2.data;
          const areap = await axios.get(`${getUrl()}/MindCare/API/areaprof/idpro/${profissional.id}`);
          const areaT = await axios.get(`${getUrl()}/MindCare/API/areatrabalho/${areap.data.idarea}`);

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'Navegacao2',
                  params: {
                    id: profissional.id,
                    nome: usuario.nome,
                    telefone: usuario.telefone,
                    email: usuario.email,
                    password: usuario.password,
                    datanascimento: formattedDate,
                    genero: usuario.genero,
                    espe: areaT.data.area,
                    expe: profissional.tempoexperiencia,
                  },
                },
              ],
            })
          );
        } catch {
          console.log('erro ao encontrar Profissional')
        }
    } catch (error) {
      setEspaco("Senha ou nome incorretos.");
      console.log(error);
    }    
  };

  return (
    <SafeAreaView style={stylesMobile.safeArea}>
      <KeyboardAvoidingView behavior="padding" style={stylesMobile.container}>
        <View style={stylesMobile.inner}>
          <Image
            source={{
              uri: "https://img.freepik.com/vetores-premium/trevo-com-quatro-folhas-isoladas-no-fundo-branco-conceito-da-sorte-no-estilo-cartoon-realista_302536-46.jpg"
            }}
            style={stylesMobile.logo}
          />
          <Text style={stylesMobile.welcomeText}>Iniciar Sessão</Text>
          <TextInput
            style={stylesMobile.textbox}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={"#b3b3b3"}
          />
          <TextInput
            style={stylesMobile.textbox}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            placeholder="Senha"
            placeholderTextColor={"#b3b3b3"}
          />
          <Text style={{ fontSize: 11, color: "red" }}>{espaco}</Text>
          <TouchableOpacity onPress={iniciar}>
            <LinearGradient colors={['#2E8B57', '#4CD964']} style={stylesMobile.button}>
                <Text style={stylesMobile.buttonText}>Iniciar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const stylesMobile = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#20613d"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30
  },
  inner: {
    alignItems: "center",
    width: "100%",
    gap: 20
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 80,
    backgroundColor: "#e7fbe6",
    marginBottom: 10
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4CD964"
  },
  textbox: {
    marginTop: 20,
    color: "#000",
    width: "80%",
    height: 50,
    borderRadius: 50,
    backgroundColor: "#e3e6e3",
    textAlign: "center"
  },
  button: {
    width: 220,
    height: 52,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

const stylesWeb = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    height: 80,
    backgroundColor: "#005631",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  logoHeader: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  left: {
    flex: 1,
    backgroundColor: "#005631",
    padding: 60,
    justifyContent: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: "#dcdcdc",
    marginBottom: 40,
  },
  leftImage: {
    width: "80%",
    height: 250,
    resizeMode: "contain",
  },
  right: {
    flex: 1,
    backgroundColor: "#e8ffe9",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    gap: 20,
    alignItems: "center",
  },
  formTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#e3e6e3",
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
  esqueci: {
    color: "#999",
    fontSize: 14,
  },
  erro: {
    fontSize: 13,
    color: "red",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  instagram: {
    color: "#2E8B57",
    marginTop: 10,
    fontSize: 15,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});