import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Conversa from './Conversa/Conversa';
import Perfil01 from './Perfil/Perfil01';
import Consulta from './Consulta/Consulta';
import Paciente from './Paciente/Pacientes';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();

export default function Navegacao2({ route }) {
  const { id, nome, telefone, email, password, datanascimento, genero, espe, expe } = route.params;
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#e0e0e0',
        tabBarStyle: {
          height: 50,
          width: '100%',
        },     
        tabBarItemStyle: {
          marginHorizontal: 0
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#20613d', '#20613d']}
            style={{ flex: 1 }}
          />
        ),
        tabBarLabel: undefined,
      }}
    >
      <Tab.Screen
        name="Conversas"
        component={Conversa}
        initialParams={{ id }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-outline" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Pacientes"
        component={Paciente}
        initialParams={{ id, nomep: nome }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
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
            <Ionicons name="videocam-outline" size={size} color={color} />
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
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}