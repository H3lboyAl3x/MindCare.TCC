import React, { useEffect, useRef, useState } from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity,SafeAreaView,Platform,KeyboardAvoidingView,ScrollView,Linking,Animated,Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const image1Url = "https://img.freepik.com/vetores-premium/trevo-com-quatro-folhas-isoladas-no-fundo-branco-conceito-da-sorte-no-estilo-cartoon-realista_302536-46.jpg";
const image2Url = "https://aebo.pt/wp-content/uploads/2024/05/spo-300x300.png";

const frases = [
  "Cuidamos da sua saúde mental com atendimento online e seguro.",
  "Conecte-se com psicólogos experientes sem sair de casa.",
  "Apoio emocional, sempre ao seu alcance.",
  "Psicologia acessível, humana e acolhedora.",
];

const windowHeight = Dimensions.get('window').height;

export default function TelaInicio01({ navigation }) {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  return (
    <SafeAreaView style={stylesMobile.safeArea}>
      <KeyboardAvoidingView behavior="padding" style={stylesMobile.container}>
        <View style={stylesMobile.inner}>
          <Image
            source={{ uri: 'https://img.freepik.com/vetores-premium/trevo-com-quatro-folhas-isoladas-no-fundo-branco-conceito-da-sorte-no-estilo-cartoon-realista_302536-46.jpg' }}
            style={stylesMobile.logo}
          />
          <Text style={stylesMobile.welcome}>Bem-vindo ao</Text>
          <Text style={stylesMobile.title}>MindCare-Empresa</Text>
          <TouchableOpacity onPress={() => navigation.navigate('IniciarSessao')}>
            <LinearGradient colors={['#2E8B57', '#4CD964']} style={stylesMobile.button}>
              <Text style={stylesMobile.buttonText}>Iniciar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Text style={{marginTop: 10, color: '#4CD964'}} onPress={() => navigation.navigate('Sobre')}>📃Sobre nos</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const stylesMobile = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#20613d',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  inner: {
    alignItems: 'center',
    gap: 20,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 80,
    backgroundColor: '#e7fbe6',
    marginBottom: 10,
  },
  welcome: {
    fontSize: 20,
    color: '#2E8B57',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CD964',
  },
  button: {
    width: 220,
    height: 52,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const stylesweb = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    alignItems: "center",
    flexDirection: 'row',
    backgroundColor: '#20613d',
    width: '100%',
    height: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CD964",
    marginLeft: 5,
  },
  mainImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  imageContainer: {
    alignItems: "center",
  },
  secondaryImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  contactContainer: {
    alignItems: "center",
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E8B57",
  },
  contactText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#4CD964",
    borderRadius: 5,
    alignSelf: 'flex-end',
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderImage: {
    width: '50%',
    height: 450,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  menu: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  overlay: {
    position: 'absolute',
    bottom: 100,
    left: 450,
    right: 400,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
    borderRadius: 12,
    width: "40%",
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  overlayText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#20613d',
  height: 65,
  marginTop: 10,
},
});