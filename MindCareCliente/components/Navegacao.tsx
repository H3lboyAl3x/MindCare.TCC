import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Conversa from './Conversa/Conversa';
import Profissionais from './Profissionais/Profissionais';
import Perfil from './Perfil/Perfil';
import Consulta from './Consulta/Consulta';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();

export default function Navegacao({ route }) {
  const { id, nome, telefone, email, password, datanascimento, genero } = route.params;
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#20613d',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {height: 55},
        tabBarBackground: () => (<LinearGradient colors= {['#4CD964', '#4CD964']} style={{ flex: 1 }}/>),
      }}>
      <Tab.Screen
        name="Profissionais"
        component={Profissionais}
        initialParams={{ idu: id, nomeu: nome, telefoneu: telefone, emailu: email, passwordu: password, datanascimentou: datanascimento, generou: genero  }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Conversas"
        component={Conversa}
        initialParams={{ id, nome, telefone, email, password, datanascimento, genero }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      
      <Tab.Screen
        name="Consulta"
        component={Consulta}
        initialParams={{ id }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="videocam-outline" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        initialParams={{ id, nome, telefone, email, password, datanascimento, genero }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}