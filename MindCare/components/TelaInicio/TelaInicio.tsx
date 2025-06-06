import React, { useEffect, useRef, useState } from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity,SafeAreaView,Platform,KeyboardAvoidingView,ScrollView,Linking,Animated,Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TelaInicio({ navigation }) {
  
  return (
    <SafeAreaView style={stylesMobile.safeArea}>
      <KeyboardAvoidingView behavior="padding" style={stylesMobile.container}>
        <View style={stylesMobile.inner}>
          <Image
            source={{ uri: 'https://img.freepik.com/vetores-premium/trevo-com-quatro-folhas-isoladas-no-fundo-branco-conceito-da-sorte-no-estilo-cartoon-realista_302536-46.jpg' }}
            style={stylesMobile.logo}
          />
          <Text style={stylesMobile.welcome}>Bem-vindo ao</Text>
          <Text style={stylesMobile.title}>MindCare</Text>
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