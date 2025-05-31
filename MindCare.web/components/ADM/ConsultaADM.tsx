import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Linking, Alert } from "react-native";
import { getUrl } from "@/app/utils/url";
import axios from "axios";

const { width, height } = Dimensions.get("window");

export default function ConsultaADM({ navigation, route }) {
    const { idConsulta, dataConsulta, horaConsulta, idpaci, idp, nomeprofissional, nomepaciente } = route.params;

    const formattedDate = new Date(dataConsulta).toISOString().split("T")[0];
    const formattedTime = horaConsulta.slice(0, 5);

    const Apagarconsulta = async () => {
        try {
            await axios.put(`${getUrl()}/MindCare/API/consultas/${idConsulta}`, {
              data: dataConsulta,
              hora: horaConsulta,
              idpaci: idpaci,
              idpro: idp,
              status: "Cancelada por emergencia",
              link: ``,
            });
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao cancelar consulta:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Consultas com: {nomeprofissional} e {nomepaciente}</Text>
            <Image
                source={{ uri: 'https://img.freepik.com/vetores-premium/trevo-com-quatro-folhas-isoladas-no-fundo-branco-conceito-da-sorte-no-estilo-cartoon-realista_302536-46.jpg' }}
                style={styles.logo}
            />
            <Text style={styles.consultaText}>Data: {formattedDate}     |     Hora: {formattedTime}</Text>
            <TouchableOpacity style={styles.botao} onPress={() => Apagarconsulta()}><Text style={[styles.buttonText, { color: '#fa393d' }]}>Cancelamento de emergencia</Text></TouchableOpacity>
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
        fontSize: 20,
        marginBottom: height * 0.02,
        color: '#fff',
        textAlign: 'center'
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: width * 0.25,
        alignSelf: 'center',
        marginBottom: height * 0.04,
    },
    consultaText: {
        fontSize: 25,
        color: "#fff",
        textAlign: 'center',
        marginBottom: height * 0.05,
        backgroundColor: '#2a8c26',
        paddingVertical: height * 0.015,
        borderRadius: 10,
    },
    botao: {
        width: 300,
        height: 45,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#7EBF42',
    },
});