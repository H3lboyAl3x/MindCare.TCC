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
            colors= {['#20613d', '#20613d']}
            style={{ flex: 1 }}
          />
        ),
        tabBarLabel: undefined,
      }}
    >
      <Tab.Screen
        name="Conversas"
        component={Conversa}
        initialParams={{ id: id}}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profissionais"
        component={Profissionais}
        initialParams={{ idu: id, nomeu: nome, telefoneu: telefone, emailu: email, passwordu: password, datanascimentou: datanascimento, generou: genero  }}
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
        component={Perfil}
        initialParams={{ id, nome, telefone, email, password, datanascimento, genero }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={20} color={color} />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}