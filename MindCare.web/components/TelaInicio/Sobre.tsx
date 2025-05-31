import React from "react";
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet, Alert, Platform, ToastAndroid } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Sobre({navigation}) {
    return(
        <View style={stylesweb.container}>
                {/* Cabeçalho */}
                <View style={stylesweb.header}>
                  <Ionicons name="arrow-back-outline" size={35} color={"#fff"} onPress={() => navigation.goBack()}/>
                  <Image source={{ uri: "https://img.freepik.com/vetores-premium/trevo-com-quatro-folhas-isoladas-no-fundo-branco-conceito-da-sorte-no-estilo-cartoon-realista_302536-46.jpg" }} style={stylesweb.mainImage} />
                  <Text style={stylesweb.title}>Bem-vindo ao Espaço Gaya</Text>
                </View>
                  <View style={{width: '100%'}}>
                    {/* Imagem Secundária */}
                    <View style={stylesweb.imageContainer}>
                     <Image source={{ uri: "https://aebo.pt/wp-content/uploads/2024/05/spo-300x300.png" }} style={stylesweb.secondaryImage} />
                    </View>
                    {/* Contato */}
                    <View style={stylesweb.contactContainer}>
                      <Text style={stylesweb.contactTitle}>Entre em Contato</Text>
                      <Text style={[stylesweb.contactText, {fontSize: 14, textAlign: 'center', width: '80%'}]}>O Espaço Gaya oferece serviços de Telemedicina para cuidados psicológicos. Nossa equipe especializada está pronta para
                      fornecer o apoio necessário ao seu bem-estar, com consultas online realizadas com qualidade e conforto, onde quer que você esteja.</Text>
                      <Text style={stylesweb.contactText}>📞 Telefone: 928824001</Text>
                      <Text style={stylesweb.contactText}>✉️ Email: rda.geral.2021@gmail.com</Text>
                    </View>
                    {/* Botão Instagram */}
                    <TouchableOpacity
                      style={stylesweb.button}
                      onPress={() => Linking.openURL("https://www.instagram.com/espaco_gaya_?igsh=aDgyNTihNjJwaWxp")}>
                      <Text style={stylesweb.buttonText}>Visite nosso Instagram</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            );
}
const stylesweb = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    alignItems: "center",
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#20613d',
    width: '100%',
    height: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CD964",
    textAlign: "center",
    marginLeft: 10,
  },
  mainImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginLeft: 10,
  },
  menu: {
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  secondaryImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: "contain",
  },
  contactContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#4CD964",
    borderRadius: 5,
    alignSelf: "center",
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sliderContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  sliderImage: {
    width: '50%',
    height: 450,
    borderRadius: 20,
    resizeMode: 'cover',
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
});