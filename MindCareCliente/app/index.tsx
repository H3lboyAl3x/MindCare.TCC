import { createStackNavigator  } from "@react-navigation/stack";
import TelaInicio from "@/components/TelaInicio/TelaInicio";
import IniciarSessao from "@/components/TelaInicio/IniciarSessao";
import Navegacao from "@/components/Navegacao";
import Perfil from "@/components/Perfil/Perfil";
import Mensagem from "@/components/Conversa/Mensagem";
import Proficional from "@/components/Profissionais/Profissional";
import ExibirInformacao from "@/components/Perfil/ExibirInformacao";
import MarcarConsulta from "@/components/Consulta/MarcarConsulta";
import AnalisarConsultas from "@/components/Consulta/AnalisarConsultas";
import AdiarConsulta from "@/components/Consulta/AdiarConsulta";
import Sobre from "@/components/TelaInicio/Sobre";
import VideoCall from "@/components/Consulta/VideoCall";
import { RootStackParamList } from "@/components/types/types";
import React from "react";

const Stack = createStackNavigator<RootStackParamList>();


export default function HomeScreen() {
  
  return(
    <Stack.Navigator screenOptions={{
      headerShown: false,
      animation: "slide_from_right",
      gestureEnabled: true,
    }}
    initialRouteName='TelaInicio'>
      <Stack.Screen name="TelaInicio" component={TelaInicio} options={{ headerShown: false }}/>
      <Stack.Screen name="Sobre" component={Sobre} options={{ headerShown: false }}/>
      <Stack.Screen name="IniciarSessao" component={IniciarSessao} options={{ headerShown: false }}/>
      <Stack.Screen name="Navegacao" component={Navegacao} options={{ headerShown: false }}/>
      <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
      <Stack.Screen name="Mensagem" component={Mensagem} options={{ headerShown: false }}/>
      <Stack.Screen name="Proficional" component={Proficional} options={{ headerShown: false }}/>
      <Stack.Screen name="ExibirInformacao" component={ExibirInformacao} options={{ headerShown: false }}/>
      <Stack.Screen name="MarcarConsulta" component={MarcarConsulta} options={{ headerShown: false }}/>
      <Stack.Screen name="AnalisarConsultas" component={AnalisarConsultas} options={{ headerShown: false }}/>
      <Stack.Screen name="AdiarConsulta" component={AdiarConsulta} options={{ headerShown: false }}/>
      <Stack.Screen name="VideoCall" component={VideoCall} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}