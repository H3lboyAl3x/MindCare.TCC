import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { CommonActions } from "@react-navigation/native";

export default function ExibirInformacaop({ navigation, route }) {
    const { id, idp, nome, telefone, email, password, datanascimento, genero, espe, expe } = route.params;
    const TerminarSessao = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{name: 'IniciarSessao'},
                ],
            })
        );
    }
    
    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }} style={styles.avatar}/>
            <View style={styles.Inf}>
                <Text style={styles.text}>Nome: {nome}</Text>
                <Text style={styles.text}>Telefone: {telefone}</Text>
                <Text style={styles.text}>Email: {email}</Text>
                <Text style={styles.text}>Data de Nascimento: {datanascimento}</Text>
                <Text style={styles.text}>Gênero: {genero}</Text>
                <Text style={styles.text}>Area de Trabalho: {espe}</Text>
                <Text style={styles.text}>Ano de Experiencia: {expe}</Text>
                <TouchableOpacity style={styles.EP} onPress={() => TerminarSessao()}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Terminar Sessao</Text>
                </TouchableOpacity>

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
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 70,
        backgroundColor: "#e7fbe6",
        alignSelf: 'center',
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
        width: '70%',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
    }
});
