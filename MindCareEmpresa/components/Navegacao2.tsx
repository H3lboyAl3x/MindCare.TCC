import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Conversa from './Conversa/Conversa';
import Perfil01 from './Perfil/Perfil01';
import Consulta from './Consulta/Consulta';
import Paciente from './Paciente/Pacientes';

const Tab = createBottomTabNavigator();

export default function Navegacao2({ route }) {
  const { id, nome, telefone, email, password, datanascimento, genero, espe, expe } = route.params;
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#20613d',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {height: 70, backgroundColor: '#4CD964'},
        tabBarLabelStyle: {fontSize: 9}
      }}>
      <Tab.Screen
        name="Pacientes"
        component={Paciente}
        initialParams={{ id, nomep: nome }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={22} color={color} />
          ),
          headerShown: false
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
          headerShown: false
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
        component={Perfil01}
        initialParams={{ id, nome, telefone, email, password, datanascimento, genero, espe: espe, expe: expe }}
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