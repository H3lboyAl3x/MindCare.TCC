import { getUrl } from "@/app/utils/url";
import axios from "axios";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform, Modal, FlatList, TextInput, SafeAreaView, Image, KeyboardAvoidingView, ScrollView } from "react-native";


export default function EditarPerfil({navigation,route}){
    const {ide, nomee, telefonee, emaile, passworde, datanascimentoe, generoe} = route.params;
    const [Nome, setnome] = useState(nomee);
    const [Telefone, settelefone] = useState(telefonee);
    const [Email, setemail] = useState(emaile);


  const [datanascimento, setDatan] = useState<Date | null>(datanascimentoe ? new Date(datanascimentoe) : null);
  const [genero, setGenero] = useState(generoe);
  const [showGenderModal, setShowGenderModal] = useState(false);

  const Editar = async () => {
    if (!datanascimento) {
      return;
    }
    const formattedDate = datanascimento.toISOString().split('T')[0];
    try {
        const response = await axios.put(`${getUrl()}/MindCare/API/users/${ide}`, {
            nome: Nome.trim() || nomee,
            email: Email.trim() || emaile,
            telefone: Telefone.trim() || telefonee,
            datanascimento: formattedDate,
            passworde: passworde,
            genero: genero,
        });
        const user = response.data
        navigation.goBack();

    } catch (error) {
      console.error("Erro ao Editar", "Tente novamente mais tarde. "+error);
    }
  };
  

  const genders = ['Masculino', 'Feminino', 'Não incluir'];
  const maximumDate = new Date();
  maximumDate.setFullYear(maximumDate.getFullYear());

  if(Platform.OS === 'web'){
    return(
      <SafeAreaView style={stylesWeb.safeArea}>
              {/* Cabeçalho */}
              <View style={stylesWeb.header}>
                <Image
                  source={{ uri: "https://aebo.pt/wp-content/uploads/2024/05/spo-300x300.png" }}
                  style={stylesWeb.logoHeader}
                />
              </View>
      
              {/* Corpo */}
              <View style={stylesWeb.container}>
                {/* Coluna Esquerda */}
                <View style={stylesWeb.left}>
                  <Text style={stylesWeb.title}>Editar Conta</Text>
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
                      placeholder={nomee}
                      value={Nome}
                      onChangeText={setnome}
                    />
                    <TextInput
                      style={stylesWeb.input}
                      placeholder={telefonee}
                      keyboardType="phone-pad"
                      value={Telefone}
                      onChangeText={settelefone}
                    />
                    <TextInput
                      style={stylesWeb.input}
                      placeholder={emaile}
                      keyboardType="email-address"
                      value={Email}
                      onChangeText={setemail}
                    />
                    <TouchableOpacity style={stylesWeb.input} onPress={() => {navigation.navigate('EditarSenha', {
                                id: ide,
                                nome: nomee,
                                telefone: telefonee,
                                email: emaile,
                                password: passworde,
                                datanascimento: datanascimentoe,
                                genero: generoe
                            })}}>
                        <Text style={{color: '#4CD964'}}>Alterar minha Senha</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={stylesWeb.input}>
                                  <input
                                    type="date"
                                    style={{ width: '100%', height: '100%', border: 'none', backgroundColor: 'transparent', textAlign: 'center', color: datanascimento ? '#4CD964' : '#b3b3b3' }}
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
                                  <Text style={{ color: genero ? '#4CD964' : '#b3b3b3' }}>
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

                    <TouchableOpacity onPress={Editar}>
                      <LinearGradient colors={["#2E8B57", "#4CD964"]} style={stylesWeb.button}>
                        <Text style={stylesWeb.buttonText}>Editar</Text>
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
    paddingTop: 0,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    gap: 20,
    alignItems: "center",
  },
  formTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 1,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#e3e6e3",
    textAlign: "center",
    fontSize: 16,
    color: "#4CD964",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0.5,
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