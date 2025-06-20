import React, { useState } from 'react';
import axios from "axios";
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Platform, SafeAreaView, Image } from 'react-native';
import { getUrl } from '@/app/utils/url';
import { LinearGradient } from 'expo-linear-gradient';
import { CommonActions } from '@react-navigation/native';

export default function CriarConta02p({ route, navigation }) {
  const { nome, telefone, email, password, idad, emailad, passwordad} = route.params;
  const [genero, setGenero] = useState('');
  const [expe, setexperiencia] = useState('');
  const [espe, settrabalho] = useState('');
  const [datanascimento, setDatan] = useState<Date | null>(null);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showexperiencia, setshowexperiencia] = useState(false);
  const [showtrabalho, setshowtrabalho] = useState(false);
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
      const response1 = await axios.post(`${getUrl()}/MindCare/API/profissionais`, {
        id: Usuario.id,
        tempoexperiencia: expe,
      });
      const Profissional = response1.data;
      const response2 = await axios.post(`${getUrl()}/MindCare/API/areatrabalho`, {
        area: espe
      });
      const AreaTrabalho = response2.data;
      await axios.post(`${getUrl()}/MindCare/API/areaprof`, {
        idarea: AreaTrabalho.id,
        idpro: Profissional.id
      });

      try {
        const response = await axios.post(`${getUrl()}/MindCare/API/enviar-sms`, {
          telefone,
          password
        });
        alert('Sucesso');
      } catch (error) {
        console.error(error);
        alert('Falha ao enviar o SMS.');
      }
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{
            name: 'TelaInicio02',
            params: {id: idad, email: emailad, password: passwordad },
          },],
        })
      );
      alert('Conta registrada com sucesso!')
    } catch (error) {
      alert("Erro ao cadastrar, Tente novamente mais tarde.");
    }
  };
  

  const genders = ['Masculino', 'Feminino', 'Não incluir'];
  const experent = ['1 ou menos', '2', '3', '4', '5 ou mais'];
  const work = ['Psicologia clínica', 'Psicologia Educacional', 'Terapeuta holístico', 'Terapeuta de Renascimento', 'Orientador Vocacional', 'Terapeuta Juvenil'];
  const maximumDate = new Date();
  maximumDate.setFullYear(maximumDate.getFullYear() - 18);


  if (Platform.OS === "web") {
      return (
        <SafeAreaView style={stylesWeb.safeArea}>
          {/* Cabeçalho */}
          <View style={stylesWeb.header}>
            <TouchableOpacity onPress={() => navigation.navigate("TelaInicio01")}>
              <Image
                source={require('../../../assets/images/mente.png')}
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
                Preencha todos os campos para finalizar o cadastro do profissionais no MindCare.
              </Text>
              <Image
                source={require('../../../assets/images/nuvem.png')}
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

              <TouchableOpacity style={stylesWeb.input} onPress={() => setshowexperiencia(true)}>
              <Text style={{ color: expe ? '#000' : '#b3b3b3' }}>
                {expe || 'Anos de experiencia'}
              </Text>
            </TouchableOpacity>

            <Modal visible={showexperiencia} transparent={true} animationType="slide" onRequestClose={() => setshowexperiencia(false)}>
              <View style={stylesWeb.modalContainer}>
                <View style={stylesWeb.modalContent}>
                  <Text style={stylesWeb.modalTitle}>Selecione a experiencia-ano</Text>
                  <FlatList
                    data={experent}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={stylesWeb.modalItem} onPress={() => { setexperiencia(item); setshowexperiencia(false); }}>
                        <Text style={[stylesWeb.modalText, {width: 50, textAlign: 'center'}]}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </Modal>

            <TouchableOpacity style={stylesWeb.input} onPress={() => setshowtrabalho(true)}>
              <Text style={{ color: espe ? '#000' : '#b3b3b3' }}>
                {espe || 'Area de trabalho'}
              </Text>
            </TouchableOpacity>

            <Modal visible={showtrabalho} transparent={true} animationType="slide" onRequestClose={() => setshowtrabalho(false)}>
              <View style={stylesWeb.modalContainer}>
                <View style={stylesWeb.modalContent}>
                  <Text style={stylesWeb.modalTitle}>Selecione a sua Area de Trabalho</Text>
                  <FlatList
                    data={work}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={stylesWeb.modalItem} onPress={() => { settrabalho(item); setshowtrabalho(false); }}>
                        <Text style={stylesWeb.modalText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </Modal>

            <Text style={{ fontSize: 11, color: 'red' }}>{espaco}</Text>
                
                <TouchableOpacity style={stylesWeb.button} onPress={criar2}>
                  <LinearGradient colors={["#2E8B57", "#4CD964"]} style={[stylesWeb.button, {width: '100%'}]}>
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
    color: "#000",
    alignItems: 'center',
    justifyContent: 'center',
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