import React, { useEffect } from 'react';
import { View, Alert, Platform } from 'react-native';
import * as Linking from 'expo-linking';

export default function VideoCall({ navigation, route }) {
  const { link, hora, data } = route.params;

  useEffect(() => {
    const consultaHora = new Date(`${data}T${hora}:00`);
    const agora = new Date();

    const fimSessao = new Date(consultaHora.getTime() + 60 * 60 * 1000);
    const tempoRestante = fimSessao.getTime() - agora.getTime();

    if (tempoRestante > 0) {
      const timer = setTimeout(() => {
        Alert.alert(
          'Sessão terminada',
          'A sessão chegou ao limite, muito obrigado pelo tempo dedicado.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ],
          { cancelable: false }
        );
      }, tempoRestante);

      return () => clearTimeout(timer);
    }

    // Abrir no navegador automaticamente se for web
    if (Platform.OS === 'web') {
      Linking.openURL(link);
    }
  }, [hora, data, navigation]);

  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Informar que será redirecionado */}
      </View>
    );
  }
}