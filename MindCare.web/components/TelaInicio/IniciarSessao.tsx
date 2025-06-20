import React, { useState } from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,SafeAreaView,Platform,Image} from "react-native";
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
      let Adm = null;
      try {
        const ADM = await axios.post(`${getUrl()}/MindCare/API/adm/login`, { telefone, password });
        Adm = ADM.data;
      } catch (error) {
        console.log("Não é ADM:",error);
      }
  
      if (Adm) {
        navigation.navigate('TelaInicio02', { id: Adm.id, email: Adm.telefone, password: Adm.password });
      } else {
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
              routes: [
                {
                  name: 'Navegacao1',
                  params: {
                    id: paciente.id,
                    nome: usuario.nome,
                    telefone: usuario.telefone,
                    email: usuario.email,
                    password: usuario.password,
                    datanascimento: formattedDate,
                    genero: usuario.genero,
                  },
                },
              ],
            })
          );
        } catch {
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
        }
      }
    } catch (error) {
      setEspaco("Senha ou nome incorretos.");
      console.log(error);
    }    
  };

  if (Platform.OS === "web") {
    return (
      <SafeAreaView style={stylesWeb.safeArea}>
        {/* Cabeçalho */}
        <View style={stylesWeb.header}>
          <TouchableOpacity onPress={() => navigation.dispatch(CommonActions.reset({index: 0, routes: [{name: 'TelaInicio01'}],}))}>
            <Image
              source={require('../../assets/images/mente.png')}
              style={stylesWeb.logoHeader}
            />
          </TouchableOpacity>
        </View>

        {/* Corpo */}
        <View style={stylesWeb.container}>
          {/* Coluna Esquerda */}
          <View style={stylesWeb.left}>
            <Text style={stylesWeb.title}>Bem-vindo a MindCare</Text>
            <Text style={stylesWeb.subtitle}>
              Aqui a tua saúde mental é prioridade. Faça login para continuar.
            </Text>
            <Image
              source={require('../../assets/images/nuvem.png')}
              style={stylesWeb.leftImage}
            />
          </View>

          {/* Coluna Direita */}
          <View style={stylesWeb.right}>
            <View style={stylesWeb.form}>
              <Text style={stylesWeb.formTitle}>Iniciar Sessão</Text>
              <TextInput
                style={stylesWeb.input}
                placeholder="Telefone"
                placeholderTextColor="#b3b3b3"
                value={telefone}
                onChangeText={settelefone}
                keyboardType="phone-pad"
              />
              <TextInput
                style={stylesWeb.input}
                placeholder="Senha"
                placeholderTextColor="#b3b3b3"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Text style={stylesWeb.erro}>{espaco}</Text>
              <TouchableOpacity style={stylesWeb.button} onPress={iniciar}>
                <LinearGradient colors={["#2E8B57", "#4CD964"]} style={[stylesWeb.button, {width: '100%'}]}>
                  <Text style={stylesWeb.buttonText}>Entrar</Text>
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
    width: "70%",
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