import React, { useState } from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,SafeAreaView,KeyboardAvoidingView,Image} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { getUrl } from "@/app/utils/url";
import { CommonActions } from "@react-navigation/native";

export default function IniciarSessao({ navigation }) {
  const [telefone, settelefone] = useState("");
  const [password, setPassword] = useState("");
  const [espaco, setEspaco] = useState("");

  const iniciar = async () => {
    if (!telefone || !password) {
      setEspaco("Preencha todos os campos antes de continuar.");
      return;
    }

    try {
      const response = await axios.post(`${getUrl()}/MindCare/API/users/login`, { telefone, password });
      const usuario = response.data;
      const formattedDate = usuario.datanascimento
      ? new Date(usuario.datanascimento).toISOString().split("T")[0]
      : null;
      try {
        const response1 = await axios.get(`${getUrl()}/MindCare/API/pacientes/${usuario.id}`);
        const paciente = response1.data;
        navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{
            name: 'Navegacao',
            params: {
              id: paciente.id,
              nome: usuario.nome,
              telefone: usuario.telefone,
              email: usuario.email,
              password: usuario.password,
              datanascimento: formattedDate,
              genero: usuario.genero,
            },
          },],
        })
      );
    } catch {
      console.log("Erro ao encontrar Paciente")
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
            source={require('../../assets/images/trevo.jpg')}
            style={stylesMobile.logo}
          />
          <Text style={stylesMobile.welcomeText}>Iniciar Sessão</Text>
          <TextInput
            style={stylesMobile.textbox}
            value={telefone}
            onChangeText={settelefone}
            placeholder="Telefone"
            placeholderTextColor={"#b3b3b3"}
            keyboardType="phone-pad"
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