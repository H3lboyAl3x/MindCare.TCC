import axios from "axios";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image} from "react-native";
import { getUrl } from "@/app/utils/url";
import { CommonActions } from "@react-navigation/native";

export default function ExibirInformacao({ navigation, route }) {
    const { id, nome, telefone, email, datanascimento, genero, idadm, emailadm, passwordadm  } = route.params;

    const Eliminarconta = async () => {
        const baseUrl = `${getUrl()}/MindCare/API`;
    
        try {
            // 1. Buscar todos os chats do paciente
            const resChats = await axios.get(`${baseUrl}/chats/idpaci/${id}`);
            const chats = resChats.data;
    
            if (Array.isArray(chats)) {
                for (const chat of chats) {
                    try {
                        await axios.delete(`${baseUrl}/mensagens/chat/${chat.id}`);
                        await axios.delete(`${baseUrl}/chats/${chat.id}`);
                    } catch (err) {
                        alert('erro ao apagar conversa')
                        console.log(`Erro ao apagar mensagens/chat ID ${chat.id}`, err);
                    }
                }
            }
    
            // 2. Buscar todas as consultas e apagar as que são do paciente
            const resConsultas = await axios.get(`${baseUrl}/consultas`);
            const consultas = resConsultas.data;
    
            if (Array.isArray(consultas)) {
                for (const consulta of consultas) {
                    if (consulta.idpaci === id) {
                        try {
                            await axios.delete(`${baseUrl}/consultas/${consulta.id}`);
                        } catch (err) {
                            alert('erro ao apagar consulta')
                            console.log(`Erro ao apagar consulta ID ${consulta.id}`, err);
                        }
                    }
                }
            }
    
            // 3. Buscar todos os numeroP do paciente
            const resNumero = await axios.get(`${baseUrl}/numerop/idpac/${id}`);
            const numeros = resNumero.data;
    
            if (Array.isArray(numeros)) {
                for (const numero of numeros) {
                    try {
                        await axios.delete(`${baseUrl}/numeroP/${numero.id}`);
                    } catch (err) {
                        alert('erro ao apagar numerop')
                        console.log(`Erro ao apagar numeroP ID ${numero.id}`, err);
                    }
                }
            }
    
            // 4. Apagar paciente
            try {
                await axios.delete(`${baseUrl}/pacientes/${id}`);
            } catch (err) {
                alert('erro ao apagar profissional')
                console.log("Erro ao apagar paciente:", err);
            }
    
            // 7. Apagar usuário
            try {
                await axios.delete(`${baseUrl}/users/${id}`);
            } catch (err) {
                alert('erro ao apagar usuario')
                console.log("Erro ao apagar usuário:", err);
            }
            alert("Conta eliminada com sucesso.");
            navigation.navigate("TelaInicio02", {
                id: idadm,
                email: emailadm,
                password: passwordadm,
            });
    
        } catch (error) {
            console.error("Erro geral ao eliminar conta:", error);
            alert("Erro ao eliminar conta. Tente novamente.");
        }
    };
    if(Platform.OS === 'web')
    {
        return (
            <View style={styles.container}>
                <Image source={require('../../../assets/images/person.png')} style={styles.perfil}/>
                <View style={styles.Inf}>
                    <Text style={styles.text}>Nome: {nome}</Text>
                    <Text style={styles.text}>Telefone: {telefone}</Text>
                    <Text style={styles.text}>Email: {email}</Text>
                    <Text style={styles.text}>Data de Nascimento: {datanascimento}</Text>
                    <Text style={styles.text}>Gênero: {genero}</Text>

                    {idadm != 0 && (
                        <View style={{flexDirection: 'row', alignSelf: 'center', height: '100%'}}>
                            <TouchableOpacity 
                                style={styles.EP} 
                                    onPress={() => navigation.navigate('EditarPerfil', {
                                        ide: id,
                                        nomee: nome,
                                        telefonee: telefone,
                                        emaile: email,
                                        datanascimentoe: datanascimento,
                                        generoe: genero,
                                    })}>
                                <Text style={{ fontSize: 20, color: 'white' }}>Editar Perfil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.EP} 
                                    onPress={() => Eliminarconta()}>
                                <Text style={{ fontSize: 20, color: 'white' }}>Deletar Conta</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {idadm === 0 &&(
                        <TouchableOpacity 
                            style={styles.EP} 
                                onPress={() => 
                                    navigation.dispatch(
                                        CommonActions.reset({
                                            index: 0,
                                            routes: [{name: 'TelaInicio01'},
                                            ],
                                        })
                                    )
                                }>
                            <Text style={{ fontSize: 20, color: 'white' }}>Terminar Sessao</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#4CD964',
    },
    perfil: {
        margin: 10,
        borderRadius: 50,
        width: 100,
        height: 100,
    },
    Inf: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        borderBottomWidth: 1,
        width: '95%',
        marginTop: 30,
    },
    EP: {
        marginTop: 20,
        backgroundColor: '#14AE5C',
        width: 150,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
    }
});
