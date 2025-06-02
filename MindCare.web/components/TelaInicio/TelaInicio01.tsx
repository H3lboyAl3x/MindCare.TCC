import React, { useEffect, useRef, useState } from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity,SafeAreaView,Platform,KeyboardAvoidingView,ScrollView,Linking,Animated,Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const image1Url = "https://img.freepik.com/vetores-premium/trevo-com-quatro-folhas-isoladas-no-fundo-branco-conceito-da-sorte-no-estilo-cartoon-realista_302536-46.jpg";
const image2Url = "https://aebo.pt/wp-content/uploads/2024/05/spo-300x300.png";

const image = [
  require('../../assets/images/f1.png'),
  require('../../assets/images/f2.png'),
  require('../../assets/images/f3.png'),
  require('../../assets/images/f4.png'),
];

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

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        const nextIndex = (index + 1) % image.length;
        setIndex(nextIndex);
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [index]);

  if (Platform.OS === 'web') {
    return (
      <ScrollView style={stylesweb.container} contentContainerStyle={{ minHeight: windowHeight, justifyContent: 'space-between' }}>
        {/* Cabeçalho */}
        <View style={stylesweb.header}>
          <Image source={{ uri: image1Url }} style={stylesweb.mainImage} />
          <Text style={stylesweb.title}>Bem-vindo ao Espaço Gaya</Text>
          <TouchableOpacity style={{ marginLeft: 750 }} onPress={() => navigation.navigate('IniciarSessao')}>
            <LinearGradient colors={['#2E8B57', '#4CD964']} style={[stylesweb.button]}>
              <Text style={stylesweb.buttonText}>Iniciar Sessão</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={stylesweb.menu}>
          <View style={{width: '50%'}}>
            {/* Descrição com imagem e texto sobreposto */}
            <View style={stylesweb.sliderContainer}>
            <Animated.Image
              source={image[index]}
              style={[stylesweb.sliderImage, { opacity: fadeAnim }]}
             />
             <View style={stylesweb.overlay}>
              <Text style={stylesweb.overlayText}>{frases[index]}</Text>
             </View>
           </View>
          </View>

          <View style={{width: '50%'}}>
            {/* Imagem Secundária */}
            <View style={stylesweb.imageContainer}>
             <Image source={{ uri: image2Url }} style={stylesweb.secondaryImage} />
            </View>
            {/* Contato */}
            <View style={stylesweb.contactContainer}>
              <Text style={stylesweb.contactTitle}>Entre em Contato</Text>
              <Text style={[stylesweb.contactText, {fontSize: 14, textAlign: 'center', width: '80%'}]}>O Espaço Gaya oferece serviços para cuidados psicológicos. Nossa equipe especializada está pronta para
              fornecer o apoio necessário ao seu bem-estar, com a nossa plataforma de consultas online realizadas com qualidade e conforto, onde quer que você esteja.</Text>
              <Text style={stylesweb.contactText}>📞 Telefone: 928824001</Text>
              <Text style={stylesweb.contactText}>✉️ Email: rda.geral.2021@gmail.com</Text>
            </View>
            {/* Botão Instagram */}
            <TouchableOpacity
              style={[stylesweb.button, {alignSelf: 'center'}]}
              onPress={() => Linking.openURL("https://www.instagram.com/espaco_gaya_?igsh=aDgyNTihNjJwaWxp")}>
              <Text style={stylesweb.buttonText}>Visite nosso Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* rodape */}
        <View style={stylesweb.footer}>
          <Text style={[stylesweb.contactText, { fontSize: 12, color: '#fff'}]}>📞 Telefone: 928824001</Text>
          <Text style={[stylesweb.contactText, { fontSize: 12, color: '#fff'}]}>✉️ Email: rda.geral.2021@gmail.com</Text>
          <Text style={[stylesweb.contactText, { fontSize: 12, color: '#fff'}]} onPress={() => Linking.openURL('https://www.google.com/maps/place/Resid%C3%AAncias+de+Talatona/@-8.9190624,13.2036315,17z/data=!3m1!4b1!4m6!3m5!1s0x1a51f510af9aaaab:0x884c094be609522f!8m2!3d-8.9190624!4d13.2036315!16s%2Fg%2F11c60k11v2?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D')}>Angola - Luanda - Talatona</Text>
        </View>
      </ScrollView>
    );
  }
}

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
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#20613d',
  height: 65,
},
});