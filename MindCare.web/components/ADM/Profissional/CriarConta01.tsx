import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function CriarConta01p({ navigation, route }) {
  const {idad, emailad, passwordad} = route.params;
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [espaco, setEspaco] = useState("");

  const gerarSenhaAleatoria = (tamanho = 6) => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let senha = "";
    for (let i = 0; i < tamanho; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      senha += caracteres.charAt(indice);
    }
    return senha;
  };

  const criar1 = () => {
    if (!nome || !telefone || !email) {
      setEspaco("Preencha todos os campos antes de continuar.");
      return;
    }

    if (telefone.length < 9 || !/^\d+$/.test(telefone)) {
      setEspaco("O telefone deve ter pelo menos 9 dígitos e conter apenas números.");
      return;
    }

    const senhaGerada = gerarSenhaAleatoria();
    setPassword(senhaGerada);

    navigation.navigate("CriarConta02p", {
      nome,
      telefone,
      email,
      password: senhaGerada,
      idad,
      emailad,
      passwordad 
    });
  };

  if (Platform.OS === "web") {
    return (
      <SafeAreaView style={stylesWeb.safeArea}>
        {/* Cabeçalho */}
        <View style={stylesWeb.header}>
          <TouchableOpacity onPress={() => navigation.navigate("TelaInicio01")}>
            <Image
              source={{ uri: "https://aebo.pt/wp-content/uploads/2024/05/spo-300x300.png" }}
              style={stylesWeb.logoHeader}
            />
          </TouchableOpacity>
        </View>

        {/* Corpo */}
        <View style={stylesWeb.container}>
          {/* Coluna Esquerda */}
          <View style={stylesWeb.left}>
            <Text style={stylesWeb.title}>Criar Conta</Text>
            <Text style={stylesWeb.subtitle}>
              Preencha todos os campos para registrar um profissional no MindCare.
            </Text>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/4088/4088981.png" }}
              style={stylesWeb.leftImage}
            />
          </View>

          {/* Coluna Direita */}
          <View style={stylesWeb.right}>
            <View style={stylesWeb.form}>
              <Text style={stylesWeb.formTitle}>Preencha os dados</Text>
              <TextInput
                style={stylesWeb.input}
                placeholder="Nome de usuário"
                placeholderTextColor="#b3b3b3"
                value={nome}
                onChangeText={setNome}
              />
              <TextInput
                style={stylesWeb.input}
                placeholder="Telefone"
                placeholderTextColor="#b3b3b3"
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
              />
              <TextInput
                style={stylesWeb.input}
                placeholder="Email"
                placeholderTextColor="#b3b3b3"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <Text style={stylesWeb.erro}>{espaco}</Text>
              <TouchableOpacity onPress={criar1}>
                <LinearGradient colors={["#2E8B57", "#4CD964"]} style={stylesWeb.button}>
                  <Text style={stylesWeb.buttonText}>Criar Conta</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

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
    padding: 5,
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
    marginBottom: 5,
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
});