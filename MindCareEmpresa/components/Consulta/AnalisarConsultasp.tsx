import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Linking, Alert } from "react-native";
import { getUrl } from "@/app/utils/url";
import axios from "axios";
import Consulta from "./Consulta";

const { width, height } = Dimensions.get("window");

export default function AnalisarConsultasp({ navigation, route }) {
    const { idConsulta, dataConsulta, horaConsulta, idprof, idp, statusConsulta, link, nome } = route.params;

    const pegarData = () => {
        const agora = new Date();
        const ano = agora.getFullYear();
        const mes = (agora.getMonth() + 1).toString().padStart(2, '0'); // +1 porque começa do zero
        const dia = agora.getDate().toString().padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    };

    const formattedDate = new Date(dataConsulta).toISOString().split("T")[0];
    const formattedTime = horaConsulta.slice(0, 5);

    const Apagarconsulta = async () => {
        try {
            await axios.delete(`${getUrl()}/MindCare/API/consultas/${idConsulta}`);
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao cancelar consulta:", error);
        }
    };
    const Confirmarconsulta = async () => {
        try {
            await axios.put(`${getUrl()}/MindCare/API/consultas/${idConsulta}`, {
                data: dataConsulta,
                hora: horaConsulta,
                idpaci: idp,
                idpro: idprof,
                status: "Concluida",
                link: '',
            });
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao cancelar consulta:", error);
        }
    };

    const Adiarconsulta = () => {
        navigation.navigate("AdiarConsultap", {
            idConsulta,
            dataConsulta,
            horaConsulta,
            idprof,
            idp,
            statusConsulta
        });
    };

    const entrarNaChamada = () => {
        if (link && dataConsulta.toString().split("T")[0] === pegarData() || horaConsulta <= pegarData()) {
            Alert.alert(
                'Antes de iniciar a consulta...',
                'ertifique-se de estar em um local tranquilo e com uma boa conexão à internet. Ao ingressar, você passará por uma tabela se selecao. Por favor, selecione a opção "Voce e o  anfitriao", adicione a sua conta e aguarde a entrada do Paciente. Caso o Paciente não esteja presente após 20 minutos de espera, podera de retirar.',
            [{
                text: 'OK',
                onPress: () => navigation.navigate("VideoCall", {link: link, hora: horaConsulta, data: dataConsulta}),
            },],
            { cancelable: false });
        } else {
            alert('A consulta ainda não está disponível, por favor entre no horário marcado, obrigado.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Consultas com: {nome}</Text>
            <Image
                source={{ uri: 'https://img.freepik.com/vetores-premium/trevo-com-quatro-folhas-isoladas-no-fundo-branco-conceito-da-sorte-no-estilo-cartoon-realista_302536-46.jpg' }}
                style={styles.logo}
            />
            <Text style={styles.consultaText}>Data: {formattedDate}     |     Hora: {formattedTime}</Text>
            <View style={styles.Vbotao}>
                <TouchableOpacity style={styles.botao} onPress={() => Adiarconsulta()}><Text style={styles.buttonText}>Adiar</Text></TouchableOpacity>
                <TouchableOpacity style={styles.botao} onPress={() => entrarNaChamada()}><Text style={styles.buttonText}>Entrar</Text></TouchableOpacity>
            </View>
            <View style={styles.Vbotao}>
                <TouchableOpacity style={styles.botao} onPress={() => Confirmarconsulta()}><Text style={styles.buttonText}>Confirmar</Text></TouchableOpacity>
                <TouchableOpacity style={styles.botao} onPress={() => Apagarconsulta()}><Text style={[styles.buttonText, { color: '#fa393d' }]}>Cancelar</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#37C231",
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.05,
    },
    titulo: {
        fontSize: width * 0.06,
        marginBottom: height * 0.02,
        color: '#fff',
        textAlign: 'center'
    },
    logo: {
        width: width * 0.5,
        height: width * 0.5,
        borderRadius: width * 0.25,
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
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: height * 0.05,
    },
    botao: {
        width: width * 0.35,
        height: height * 0.06,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    buttonText: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: '#7EBF42',
    },
});