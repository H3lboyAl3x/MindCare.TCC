import React, { useEffect, useRef, useState } from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity,Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const image1Url = '../../assets/images/trevo.jpg';

export default function TelaInicio02({ navigation, route }) {
  const { id, email, password } = route.params;


  if (Platform.OS === 'web') {
    return (
      <View style={stylesweb.container}>
        <View style={stylesweb.header}>
          <Image source={require(image1Url)} style={stylesweb.mainImage} />
          <Text style={stylesweb.title}>Bem-Vindo Administrador</Text>
        </View>

        <View style={stylesweb.menu}>
          <TouchableOpacity style={stylesweb.quadro} onPress={() => navigation.navigate('TodosPacientes', {id, email, password})}>
            <Ionicons name='people-outline' size={100} color={"#000"}/>
            <Text style={stylesweb.text}>Pacientes</Text>

          </TouchableOpacity>
          <TouchableOpacity style={stylesweb.quadro} onPress={() => navigation.navigate('TodosProfissionais', {id, email, password})}>
            <Ionicons name='book-outline' size={100} color={"#000"}/>
            <Text style={stylesweb.text}>Profissionais</Text>
            
          </TouchableOpacity>
          <TouchableOpacity style={stylesweb.quadro} onPress={() => navigation.navigate('ListaConsulta')}>
            <Ionicons name='albums-outline' size={100} color={"#000"}/>
            <Text style={stylesweb.text}>Consultas</Text>
            
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#20613d',
    width: '100%', 
    height: 60 
  },
  mainImage: { 
    width: 50, 
    height: 50, 
    borderRadius: 25 
  },
  title: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#4CD964", 
    textAlign: "center", 
    marginLeft: 5 
  },
  menu: { 
    flex: 1, 
    flexDirection: "row", 
    height: "100%",
    backgroundColor: '#c0c0c0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quadro: {
    width: '25%',
    height: '60%',
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
