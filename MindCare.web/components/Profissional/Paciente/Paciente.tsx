import React from "react";
import {View,Text,StyleSheet,TouchableOpacity,Image,Platform,Alert,useWindowDimensions,ScrollView} from "react-native";
import { getUrl } from "@/app/utils/url";
import axios from "axios";

interface Chat {
    id: number;
    idpaci: number;
    idpro: number;
}


export default function Paciente({ navigation, route }) {
    const { idu, id, nome, email, telefone, datanascimento } = route.params;
    const { width } = useWindowDimensions();
    const isLargeScreen = width >= 800;

    const CriarConversa = async () => {
        try {
            const chats = (await axios.get<Chat[]>(`${getUrl()}/MindCare/API/chats`)).data;
            const chatExistente = chats.find(chat => chat.idpaci === id && chat.idpro === idu);

            if (chatExistente) {
                navigation.goBack();
            } else {
                const chatCriado = await axios.post(`${getUrl()}/MindCare/API/chats`, {
                    idpaci: id,
                    idpro: idu
                });

                await axios.post(`${getUrl()}/MindCare/API/numeroP`, {
                    idprof: idu,
                    idpac: id
                });

                navigation.goBack();
            }
        } catch (error) {
            console.error("Erro ao criar ou buscar chat:", error);
            Alert.alert("Erro", "Não foi possível iniciar a conversa.");
        }
    };

    const CriarConsulta = () => {
        navigation.navigate('MarcarConsultap', {
            idpaci: id,
            idpro: idu
        });
    };
    if(Platform.OS === 'web')
    {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: '#EEF3F8' }}>
                <View style={[styles.container, { padding: isLargeScreen ? 60 : 20 }]}>
                    <View style={{ height: 150, backgroundColor: '#C3D5DC', borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />

                    <View style={[
                        styles.card,
                        {
                            flexDirection: isLargeScreen ? 'row' : 'column',
                            gap: isLargeScreen ? 30 : 20,
                            alignItems: isLargeScreen ? 'center' : 'flex-start',
                        }
                    ]}>
                        <Image
                            source={require("../../../assets/images/person.png")}
                            style={[styles.avatar, { alignSelf: isLargeScreen ? "center" : "flex-start" }]}
                        />

                        <View style={{ flex: 1 }}>
                            <Text style={styles.nome}>{nome}</Text>
                            <Text style={styles.info}>Email: {email}</Text>
                            <Text style={styles.info}>Telefone: {telefone}</Text>
                        </View>

                        <View style={{
                            width: isLargeScreen ? 220 : "100%",
                            alignSelf: isLargeScreen ? "center" : "stretch",
                            gap: 10,
                            marginTop: isLargeScreen ? 0 : 20
                        }}>
                            <TouchableOpacity style={styles.botao} onPress={CriarConversa}>
                                <Text style={styles.btext}>Enviar Mensagem</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botao} onPress={CriarConsulta}>
                                <Text style={styles.btext}>Marcar Consulta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF3F8',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        marginTop: -50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#e7fbe6",
    },
    nome: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    info: {
        fontSize: 14,
        color: '#777',
    },
    botao: {
        backgroundColor: '#14AE5C',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    btext: {
        fontSize: 16,
        color: 'white',
        fontWeight: "600"
    },
});