import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CommonActions } from "@react-navigation/native";

export default function ExibirInformacao({ navigation, route }) {
    const { id, nome, telefone, email, password, datanascimento, genero  } = route.params;

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
            <Ionicons style={styles.perfil} name="person-circle-outline" size={100} color={'white'} />
            <View style={styles.Inf}>
                <Text style={styles.text}>Nome: {nome}</Text>
                <Text style={styles.text}>Telefone: {telefone}</Text>
                <Text style={styles.text}>Email: {email}</Text>
                <Text style={styles.text}>Data de Nascimento: {datanascimento}</Text>
                <Text style={styles.text}>Gênero: {genero}</Text>
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
        width: '60%',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    }
});
