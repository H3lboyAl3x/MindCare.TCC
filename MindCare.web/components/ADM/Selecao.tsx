import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Selecao({ navigation, route }) {
  const {id, email, password} = route.params;
  if (Platform.OS === 'web') {
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
            <Text style={stylesWeb.title}>Registrar</Text>
            <Text style={stylesWeb.subtitle}>
              Seja paciente ou profissional, o MindCare está aqui para cuidar de todos.
            </Text>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4088/4088981.png' }}
              style={stylesWeb.leftImage}
            />
          </View>

          {/* Coluna Direita */}
          <View style={stylesWeb.right}>
            <View style={stylesWeb.form}>
              <Text style={stylesWeb.formTitle}>Seleciona o tipo de conta</Text>

              <TouchableOpacity onPress={() => navigation.navigate('CriarConta01', { idad: id, emailad: email, passwordad: password })}>
                <LinearGradient colors={['#2E8B57', '#4CD964']} style={stylesWeb.button}>
                  <Text style={stylesWeb.buttonText}>Paciente</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('CriarConta01p', { idad: id, emailad: email, passwordad: password })}>
                <LinearGradient colors={['#2E8B57', '#4CD964']} style={stylesWeb.button}>
                  <Text style={stylesWeb.buttonText}>Profissional</Text>
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
    backgroundColor: '#ffffff',
  },
  header: {
    height: 80,
    backgroundColor: '#005631',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  logoHeader: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  left: {
    flex: 1,
    backgroundColor: '#005631',
    padding: 60,
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#dcdcdc',
    marginBottom: 40,
  },
  leftImage: {
    width: '80%',
    height: 250,
    resizeMode: 'contain',
  },
  right: {
    flex: 1,
    backgroundColor: '#e8ffe9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    gap: 20,
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
