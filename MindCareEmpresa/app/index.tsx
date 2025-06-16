import { createStackNavigator  } from "@react-navigation/stack";
import TelaInicio01 from "@/components/TelaInicio/TelaInicio01";
import IniciarSessao from "@/components/TelaInicio/IniciarSessao";
import Navegacao2 from "@/components/Navegacao2";
import Pacientes from "@/components/Paciente/Pacientes";
import Paciente from "@/components/Paciente/Paciente";
import MarcarConsultap from "@/components/Consulta/MarcarConsultap";
import ExibirInformacaop from "@/components/Perfil/ExibirInformacao";
import AnalisarConsultasp from "@/components/Consulta/AnalisarConsultasp";
import AdiarConsultap from "@/components/Consulta/AdiarConsultap";
import Sobre from "@/components/TelaInicio/Sobre";
import Progresso from "@/components/Consulta/ProgressoConsulta";
import PP from "@/components/Perfil/PP";
import VideoCall from "@/components/Consulta/VideoCall";
import Mensagem from "@/components/Conversa/Mensagem";
import { RootStackParamList } from "@/components/types/types"; // ou '../types/types' se não tiver alias "@"
import React from "react";

const Stack = createStackNavigator<RootStackParamList>();


export default function HomeScreen() {
  return(
    <Stack.Navigator screenOptions={{
      headerShown: false,
      animation: "slide_from_right",
      gestureEnabled: true,
    }}
    initialRouteName='TelaInicio01'>
      <Stack.Screen name="TelaInicio01" component={TelaInicio01} options={{ headerShown: false }}/>
      <Stack.Screen name="Sobre" component={Sobre} options={{ headerShown: false }}/>
      <Stack.Screen name="IniciarSessao" component={IniciarSessao} options={{ headerShown: false }}/>
      <Stack.Screen name="Navegacao2" component={Navegacao2} options={{ headerShown: false }}/>
      <Stack.Screen name="MarcarConsultap" component={MarcarConsultap} options={{ headerShown: false }}/>
      <Stack.Screen name="Pacientes" component={Pacientes} options={{ headerShown: false }}/>
      <Stack.Screen name="Paciente" component={Paciente} options={{ headerShown: false }}/>
      <Stack.Screen name="ExibirInformacaop" component={ExibirInformacaop} options={{ headerShown: false }}/>
      <Stack.Screen name="AnalisarConsultasp" component={AnalisarConsultasp} options={{ headerShown: false }}/>
      <Stack.Screen name="AdiarConsultap" component={AdiarConsultap} options={{ headerShown: false }}/>
      <Stack.Screen name="Progresso" component={Progresso} options={{ headerShown: false }}/>
      <Stack.Screen name="PP" component={PP} options={{ headerShown: false }}/>
      <Stack.Screen name="VideoCall" component={VideoCall} options={{ headerShown: false }}/>
      <Stack.Screen name="Mensagem" component={Mensagem} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}