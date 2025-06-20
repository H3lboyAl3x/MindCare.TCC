import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Conversa from './Conversa/Conversa';
import Profissionais from './Profissionais/Profissionais';
import Perfil from './Perfil/Perfil';
import Consulta from './Consulta/Consulta';

const Tab = createBottomTabNavigator();

export default function Navegacao({ route }) {
  const { id, nome, telefone, email, password, datanascimento, genero } = route.params;
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#20613d',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {height: 70, backgroundColor: '#4CD964'},
        tabBarLabelStyle: {fontSize: 9}
      }}>
      <Tab.Screen
        name="Área e Profissionais"
        component={Profissionais}
        initialParams={{ idu: id, nomeu: nome, telefoneu: telefone, emailu: email, passwordu: password, datanascimentou: datanascimento, generou: genero  }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={22} color={color} />
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
            <Ionicons name="chatbox-outline" size={22} color={color} />
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
            <Ionicons name="videocam-outline" size={22} color={color} />
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
            <Ionicons name="person-circle-outline" size={22} color={color} />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}