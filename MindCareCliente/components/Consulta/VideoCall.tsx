import React, { useEffect } from "react";
import { View, Alert } from "react-native";
import { WebView } from "react-native-webview";

export default function VideoCall({ navigation, route }) {
  const { link, hora, data } = route.params;

  useEffect(() => {
    const consultaHora = new Date(`${data}T${hora}:00`);
    const fimSessao = new Date(consultaHora.getTime() + 60 * 60 * 1000);
    const tempoRestante = fimSessao.getTime() - Date.now();

    if (tempoRestante > 0) {
      const timer = setTimeout(() => {
        Alert.alert(
          "Sessão encerrada",
          "A sessão chegou ao fim.",
          [{ text: "OK", onPress: () => navigation.goBack() }],
          { cancelable: false }
        );
      }, tempoRestante);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleNavigationChange = (navState: { url: string | any[]; }) => {
    // Se o usuário sair da sala, volta para tela anterior
    if (!navState.url.includes(link)) {
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: link }}
        style={{ flex: 1 }}
        javaScriptEnabled
        onNavigationStateChange={handleNavigationChange}
      />
    </View>
  );
}