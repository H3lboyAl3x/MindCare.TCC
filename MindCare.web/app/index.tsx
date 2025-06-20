import { createStackNavigator  } from "@react-navigation/stack";
import TelaInicio01 from "@/components/TelaInicio/TelaInicio01";
import TelaInicio02 from "@/components/ADM/TelaInicio02";
import IniciarSessao from "@/components/TelaInicio/IniciarSessao";
import CriarConta01 from "@/components/ADM/Paciente/CriarConta01";
import CriarConta02 from "@/components/ADM/Paciente/CriarConta02";
import Navegacao1 from "@/components/Paciente/Navegacao1";
import Navegacao2 from "@/components/Profissional/Navegacao2";
import EditarPerfil from "@/components/ADM/Paciente/EditarPerfil";
import Perfil from "@/components/Paciente/Perfil/Perfil";
import CriarConta01p from "@/components/ADM/Profissional/CriarConta01";
import CriarConta02p from "@/components/ADM/Profissional/CriarConta02";
import Mensagem from "@/components/Mensagem/Mensagem";
import Proficional from "@/components/Paciente/Profissionais/Profissional";
import ExibirInformacao from "@/components/Paciente/Perfil/ExibirInformacao";
import MarcarConsulta from "@/components/Paciente/Consulta/MarcarConsulta";
import Pacientes from "@/components/Profissional/Paciente/Pacientes";
import Paciente from "@/components/Profissional/Paciente/Paciente";
import MarcarConsultap from "@/components/Profissional/Consulta/MarcarConsultap";
import ExibirInformacaop from "@/components/Profissional/Perfil/ExibirInformacao";
import EditarPerfilp from "@/components/ADM/Profissional/EditarPerfil";
import Progresso from "@/components/Profissional/Consulta/ProgressoConsulta";
import PP from "@/components/Profissional/Perfil/PP";
import VideoCall from "@/components/VideoCall";
import TodosPacientes from "@/components/ADM/Paciente/TodosPacientes";
import TodosProfissionais from "@/components/ADM/Profissional/TodosProfissionais";
import ListaConsulta from "@/components/ADM/Consulta/ListaConsulta";
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
      <Stack.Screen name="TelaInicio02" component={TelaInicio02} options={{ headerShown: false }}/>
      <Stack.Screen name="IniciarSessao" component={IniciarSessao} options={{ headerShown: false }}/>
      <Stack.Screen name="CriarConta01" component={CriarConta01} options={{ headerShown: false }}/>
      <Stack.Screen name="CriarConta02" component={CriarConta02} options={{ headerShown: false }}/>
      <Stack.Screen name="CriarConta01p" component={CriarConta01p} options={{ headerShown: false }}/>
      <Stack.Screen name="CriarConta02p" component={CriarConta02p} options={{ headerShown: false }}/>
      <Stack.Screen name="Navegacao1" component={Navegacao1} options={{ headerShown: false }}/>
      <Stack.Screen name="Navegacao2" component={Navegacao2} options={{ headerShown: false }}/>
      <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ headerShown: false }}/>
      <Stack.Screen name="EditarPerfilp" component={EditarPerfilp} options={{ headerShown: false }}/>
      <Stack.Screen name="Perfil01" component={Perfil} options={{ headerShown: false }}/>
      <Stack.Screen name="Mensagem" component={Mensagem} options={{ headerShown: false }}/>
      <Stack.Screen name="Proficional" component={Proficional} options={{ headerShown: false }}/>
      <Stack.Screen name="ExibirInformacao" component={ExibirInformacao} options={{ headerShown: false }}/>
      <Stack.Screen name="MarcarConsulta" component={MarcarConsulta} options={{ headerShown: false }}/>
      <Stack.Screen name="MarcarConsultap" component={MarcarConsultap} options={{ headerShown: false }}/>
      <Stack.Screen name="Pacientes" component={Pacientes} options={{ headerShown: false }}/>
      <Stack.Screen name="Paciente" component={Paciente} options={{ headerShown: false }}/>
      <Stack.Screen name="ExibirInformacaop" component={ExibirInformacaop} options={{ headerShown: false }}/>
      <Stack.Screen name="Progresso" component={Progresso} options={{ headerShown: false }}/>
      <Stack.Screen name="PP" component={PP} options={{ headerShown: false }}/>
      <Stack.Screen name="VideoCall" component={VideoCall} options={{ headerShown: false }}/>
      <Stack.Screen name="TodosPacientes" component={TodosPacientes} options={{ headerShown: false }}/>
      <Stack.Screen name="TodosProfissionais" component={TodosProfissionais} options={{ headerShown: false }}/>
      <Stack.Screen name="ListaConsulta" component={ListaConsulta} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}