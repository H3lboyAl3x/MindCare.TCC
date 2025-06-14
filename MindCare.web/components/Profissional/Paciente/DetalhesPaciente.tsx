import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function DetalhesPaciente({route}){
    const {id, nome, email, telefone, datanascimento} = route.params;
    if(Platform.OS === 'web')
    {
        return(
            <View style={styles.container}>
                <Ionicons style={styles.perfil} name="person-circle-outline" size={100} color={'white'} ></Ionicons>
                <View style={styles.Inf}>
                    <Text style={styles.text}>Nome:{nome}</Text>
                    <Text style={styles.text}>Telefone:{telefone}</Text>
                    <Text style={styles.text}>Email:{email}</Text>
                    <Text style={styles.text}>Data de Nascimento:{datanascimento}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#37C231',
    },
    perfil: {
        margin: 10,
        borderRadius:50,
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
        marginTop: 20,
    }
});