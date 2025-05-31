import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getUrl } from "@/app/utils/url";
import axios from "axios";

export default function ExibirInformacaop({ navigation, route }) {
    const { id, idp, nome, telefone, email, password, datanascimento, genero, espe, expe, idadm, emailadm, passwordadm } = route.params;

    const Eliminarconta = async () => {
        const baseUrl = `${getUrl()}/MindCare/API`;
    
        try {
            // 1. Buscar todos os chats do profissional
            const resChats = await axios.get(`${baseUrl}/chats/idpro/${idp}`);
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
    
            // 2. Buscar todas as consultas e apagar as que são do profissional
            const resConsultas = await axios.get(`${baseUrl}/consultas`);
            const consultas = resConsultas.data;
    
            if (Array.isArray(consultas)) {
                for (const consulta of consultas) {
                    if (consulta.idpro === idp) {
                        try {
                            await axios.delete(`${baseUrl}/consultas/${consulta.id}`);
                        } catch (err) {
                            alert('erro ao apagar consulta')
                            console.log(`Erro ao apagar consulta ID ${consulta.id}`, err);
                        }
                    }
                }
            }
    
            // 3. Buscar todos os numeroP do profissional
            const resNumero = await axios.get(`${baseUrl}/numeroP/idprof/${idp}`);
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
    
            // 4. Buscar todas as áreas do profissional (areaprof)
            const resAreaProf = await axios.get(`${baseUrl}/areaprof/idpro/${idp}`);
            const areas = resAreaProf.data;
            if (areas && areas.id) {
                try {
                    await axios.delete(`${baseUrl}/areaprof/${areas.id}`);
                } catch (err) {
                    alert('erro ao apagar areaprof');
                    console.log(`Erro ao apagar areaprof ID ${areas.id}`, err);
                }
            }
    
            // 5. Tentar apagar a area de trabalho (se existir com mesmo id)
            try {
                const AT = await axios.get(`${baseUrl}/areatrabalho/${idp}`);
                await axios.delete(`${baseUrl}/areatrabalho/${idp}`);
            } catch (e) {
                alert('erro ao apagar areatrabalho')
                console.log("Área de trabalho não encontrada (pode ser normal).");
            }
    
            // 6. Apagar profissional
            try {
                await axios.delete(`${baseUrl}/profissionais/${idp}`);
            } catch (err) {
                alert('erro ao apagar profissional')
                console.log("Erro ao apagar profissional:", err);
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

    return (
        <View style={styles.container}>
            <Ionicons style={styles.perfil} name="person-circle-outline" size={80} color={'white'} />
            <View style={styles.Inf}>
                <Text style={styles.text}>Nome: {nome}</Text>
                <Text style={styles.text}>Telefone: {telefone}</Text>
                <Text style={styles.text}>Email: {email}</Text>
                <Text style={styles.text}>Data de Nascimento: {datanascimento}</Text>
                <Text style={styles.text}>Gênero: {genero}</Text>
                <Text style={styles.text}>Area de Trabalho: {espe}</Text>
                <Text style={styles.text}>Ano de Experiencia: {expe}</Text>

                {idadm != 0 && (
                   <View style={{flexDirection: 'row', alignSelf: 'center', height: '100%'}}>
                     <TouchableOpacity 
                        style={styles.EP} 
                        onPress={() => navigation.navigate('EditarPerfilp', {
                            ide: id,
                            idpe: idp,
                            nomee: nome,
                            telefonee: telefone,
                            emaile: email,
                            passworde: password,
                            datanascimentoe: datanascimento,
                            generoe: genero,
                            espe: espe,
                            expe: expe
                        })}
                    >
                        <Text style={{ fontSize: 20, color: 'white' }}>Editar Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.EP} 
                        onPress={() => Eliminarconta()}
                    >
                        <Text style={{ fontSize: 20, color: 'white' }}>Deletar Conta</Text>
                    </TouchableOpacity>
                   </View>
                )}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#37C231',
    },
    perfil: {
        margin: 10,
        borderRadius: 50,
        width: 80,
        height: 80,
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
        marginTop: 15,
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
