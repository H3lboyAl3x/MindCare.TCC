import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function AnalisarConsultas({ navigation, route }) {
    const { idConsulta, dataConsulta, horaConsulta, idpaci, idpro, link } = route.params;

    const pegarData = () => {
        const agora = new Date();
        const ano = agora.getFullYear();
        const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
        const dia = agora.getDate().toString().padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    };

    const formattedDate = new Date(dataConsulta).toISOString().split("T")[0];
    const formattedTime = horaConsulta.slice(0, 5);

    const Adiarconsulta = () => {
        navigation.navigate("AdiarConsulta", {
            idConsulta,
            dataConsulta,
            horaConsulta,
            idpaci,
            idpro,
        });
    };

    const entrarNaChamada = () => {
        if (link && dataConsulta.toString().split("T")[0] === pegarData() || horaConsulta >= pegarData()) {
            Alert.alert(
                'Antes de iniciar a consulta...',
                'Certifique-se de estar em um local tranquilo e com uma boa conexão à internet. Ao ingressar, você passará por uma tabela de seleção. Por favor, selecione a opção "Aguardar por anfitrião" e aguarde a entrada do profissional. Caso o profissional não esteja presente após 20 minutos de espera, entre em contato com o suporte para assistência.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('VideoCall',{link: link, hora: horaConsulta, data: dataConsulta}),
                    },
                ],
                { cancelable: false }
            );
        } else {
            alert('A consulta ainda não está disponível, por favor entre no horário marcado, obrigado.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Consultas</Text>
            <Image
                source={{ uri: 'https://img.freepik.com/vetores-premium/trevo-com-quatro-folhas-isoladas-no-fundo-branco-conceito-da-sorte-no-estilo-cartoon-realista_302536-46.jpg' }}
                style={styles.logo}
            />
            <Text style={styles.consultaText}>Data: {formattedDate}     |     Hora: {formattedTime}</Text>
            <View style={styles.Vbotao}>
                <TouchableOpacity style={styles.botao} onPress={Adiarconsulta}>
                    <Text style={styles.buttonText}>Remarcar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao} onPress={entrarNaChamada}>
                    <Ionicons name="videocam" size={width * 0.05} color="#7EBF42" />
                    <Text style={styles.buttonText}> Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4CD964",
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.05,
    },
    titulo: {
        fontSize: width * 0.06,
        marginBottom: height * 0.02,
        color: '#fff',
        textAlign: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: height * 0.04,
    },
    consultaText: {
        fontSize: width * 0.045,
        color: "#fff",
        textAlign: 'center',
        marginBottom: height * 0.05,
        backgroundColor: '#2a8c26',
        paddingVertical: height * 0.015,
        borderRadius: 10,
    },
    Vbotao: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: height * 0.05,
    },
    botao: {
        width: width * 0.35,
        height: height * 0.06,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
    },
    buttonText: {
        color: '#7EBF42',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
});