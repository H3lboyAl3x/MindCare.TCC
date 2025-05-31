import React, { useState, useEffect } from 'react';
import axios from "axios";
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Platform, SafeAreaView, Image } from 'react-native';
import { getUrl } from '@/app/utils/url';
import { LinearGradient } from 'expo-linear-gradient';

export default function CriarConta02({ route, navigation }) {
  const { nome, telefone, email, password, idad, emailad, passwordad} = route.params;

  const [datanascimento, setDatan] = useState<Date | null>(null);
  const [genero, setGenero] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [espaco, setespaco] = useState("");

  const criar2 = async () => {
    if (!datanascimento || !genero) {
      setespaco("Preencha todos os campos antes de continuar.");
      return;
    }

    const formattedDate = datanascimento.toISOString().split('T')[0];

    try {
      const response = await axios.post(`${getUrl()}/MindCare/API/users`, {
        nome,
        telefone,
        email,
        password,
        datanascimento: formattedDate,
        genero,
        idadm: idad
      });
      const Usuario = response.data;
      await axios.post(`${getUrl()}/MindCare/API/pacientes`, {
        id: Usuario.id
      });

      const payload = {
        message: {
          api_key_app: "prd22f06b2251a947e36feafebec8",
          phone_number: telefone,
          message_body: `Sr(a) ${nome}, utiliza seu numero de telefone junto do código de verificação ${password} para autenticar na aplicacao, muito obrigado por adirir nosso servico.`,
        }
      };

      try {
        const response = await axios.post("https://www.telcosms.co.ao/send_message", payload, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        return response.data;
      } catch (error) {
        alert("Erro ao enviar SMS");
      }
      navigation.navigate("TelaInicio02", {id: idad, email: emailad, password: passwordad });
      alert('Conta registrada com sucesso!')
    } catch (error) {
      console.log("Erro ao cadastrar", "Tente novamente mais tarde."+ error);
    }
  };

  const genders = ['Masculino', 'Feminino', 'Não incluir'];
  const maximumDate = new Date();
  maximumDate.setFullYear(maximumDate.getFullYear());


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
            <Text style={stylesWeb.title}>Finalizar Cadastro</Text>
            <Text style={stylesWeb.subtitle}>
              Preencha todos os campos para finalizar seu cadastro no MindCare.
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

              <TouchableOpacity style={stylesWeb.input}>
              <input
                type="date"
                style={{ width: '100%', height: '100%', border: 'none', backgroundColor: 'transparent', textAlign: 'center', color: datanascimento ? '#000' : '#b3b3b3' }}
                value={datanascimento ? datanascimento.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const dateStr = e.target.value;
                  if (dateStr) {
                    const parts = dateStr.split("-");
                    const parsedDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
                    setDatan(parsedDate);
                  }
                }}
                min="1900-01-01"
                max={maximumDate.toISOString().split('T')[0]}
              />
            </TouchableOpacity>

            <TouchableOpacity style={stylesWeb.input} onPress={() => setShowGenderModal(true)}>
              <Text style={{ color: genero ? '#000' : '#b3b3b3' }}>
                {genero || 'Gênero'}
              </Text>
            </TouchableOpacity>

            <Modal visible={showGenderModal} transparent={true} animationType="slide" onRequestClose={() => setShowGenderModal(false)}>
              <View style={stylesWeb.modalContainer}>
                <View style={stylesWeb.modalContent}>
                  <Text style={stylesWeb.modalTitle}>Selecione o Gênero</Text>
                  <FlatList
                    data={genders}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={stylesWeb.modalItem} onPress={() => { setGenero(item); setShowGenderModal(false); }}>
                        <Text style={stylesWeb.modalText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </Modal>

            <Text style={{ fontSize: 11, color: 'red' }}>{espaco}</Text>
              
              <TouchableOpacity onPress={criar2}>
                <LinearGradient colors={["#2E8B57", "#4CD964"]} style={stylesWeb.button}>
                  <Text style={stylesWeb.buttonText}>Finalizar Cadastro</Text>
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
    color: "#2E8B57",
    alignItems: 'center',
    justifyContent: 'center',
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
  },modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#37C231',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff'
  },
  modalItem: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#fff',
  },
});
