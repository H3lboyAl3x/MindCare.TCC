import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getUrl } from "@/app/utils/url";
import axios from "axios";

interface Consultas {
    id: number;
    data: string;
    hora: string;
    idpaci: number;
    idpro: number;
    status: string;
}

interface Profissional {
    id: number;
    tempoexperiencia: number;
}

interface Usuario {
   id: number;
   nome: string;
   email: string;
   telefone: string;
   datanascimento: string;
}

interface ProfissionalComNome {
   id: number;
   nome: string;
   email: string;
   telefone: string;
   datanascimento: string;
   areaT: string;
   tempoexperiencia: number;
}

interface AreaTrabalho {
   id: number;
   area: string;
}
  
interface AreaProf {
   id: number;
   idprof: number;
   idarea: number;
}
 
interface NumeroP {
   id: number;
   idprof: number;
   idpac: number;
}

export default function Perfil({navigation, route}){
    const {id, nome, telefone, email, password, datanascimento, genero} = route.params;
    const [opcaoSelecionada, setOpcaoSelecionada] = useState<"consulta" | "profissional">("consulta");
    const [consultas, setconsultas] = useState<Consultas[]>();
    const [tempex, settempex] = useState(Number);
    const [profissionaisC, setProfissionaisC] = useState<ProfissionalComNome[]>([]);

    //Buscar Consultas e Profissionais
    const ListaConsulta = async () =>{
        try {
            const consultaResponde = await axios.get<Consultas[]>(`${getUrl()}/MindCare/API/consultas`);
            const listaconsulta = consultaResponde.data;
            const consultasUnicas = listaconsulta.filter((consulta) => consulta.idpaci === id);
            setconsultas(consultasUnicas);

            const NP = await axios.get<NumeroP[]>(`${getUrl()}/MindCare/API/numeroP/idpac/${id}`);
            const listaProfissionaisC = NP.data;
            const profissionaisComNomesC: ProfissionalComNome[] = await Promise.all(
                listaProfissionaisC.map(async (Numero) => {
                try {
                    const proResponse = await axios.get<Profissional>(`${getUrl()}/MindCare/API/profissionais/${Numero.idprof}`);
                    settempex(proResponse.data.tempoexperiencia);

                    const userResponse = await axios.get<Usuario>(getUrl()+"/MindCare/API/users/"+proResponse.data.id);

                    const areapResponse = await axios.get<AreaProf>(`${getUrl()}/MindCare/API/areaprof/idpro/${proResponse.data.id}`);
                    const AreaP = areapResponse.data;

                    const areatResponse = await axios.get<AreaTrabalho>(`${getUrl()}/MindCare/API/areatrabalho/${AreaP.idarea}`)

        ;            return {
                    id: Numero.idprof,
                    nome: userResponse.data.nome,
                    email: userResponse.data.email,
                    telefone: userResponse.data.telefone,
                    datanascimento: userResponse.data.datanascimento ? userResponse.data.datanascimento.toString().split("T")[0] : "",
                    areaT: areatResponse.data.area,
                    tempoexperiencia: proResponse.data.tempoexperiencia,
                    };
                } catch (error) {
                    console.error(`Erro ao buscar numeroP ${Numero.id}:, error`);
                    return {
                    id: Numero.idprof,
                    nome: "Desconhecido",
                    email: "Desconhecido",
                    telefone: "Desconhecido",
                    datanascimento: "Desconhecido",
                    areaT: "Desconhecida",
                    tempoexperiencia: tempex,
                    };
                }
                })
            );
            setProfissionaisC(profissionaisComNomesC);
        }catch (error){
            console.error('erro a buscar consultas: '+error);

        }
    }


    


    const [cormenu1, setmenu1] = useState('white');
    const [cormenu2, setmenu2] = useState('#EEEEEF');
    useEffect(() => {
        ListaConsulta();
        const intervalo = setInterval(ListaConsulta, 1000);
        return () => clearInterval(intervalo);
      }, [id]);

    const Funcaobotao1 = () => {
        setmenu1('white');
        setmenu2('#EEEEEF');
    };
    const Funcaobotao2 = () => {
        setmenu2('white');
        setmenu1('#EEEEEF');
    };

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Perfil</Text>
            <View style={styles.header}/>
            <View style={[styles.card]}>
                <View>
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
                        style={styles.avatar}/>
                    <View style={[styles.infoContainer]}>
                        <Text style={styles.name}>{nome}</Text>
                    </View>
                    <TouchableOpacity style={styles.encrenagem} onPress={() => navigation.navigate('ExibirInformacao', {
                        id: id,
                        nome: nome,
                        telefone: telefone,
                        email: email,
                        password: password,
                        datanascimento: datanascimento,
                        genero: genero,
                    })}>
                    <Text style={{color: '#c0c0c0',}}>Ver Detalhes</Text>
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.Menu}>
                <TouchableOpacity style={[styles.menu1, {backgroundColor: cormenu1}]} onPress={() =>{ Funcaobotao1(); setOpcaoSelecionada('consulta')}}>
                    <Text style={styles.text}>Lista de consultas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.menu2, {backgroundColor: cormenu2}]} onPress={() =>{ Funcaobotao2(); setOpcaoSelecionada('profissional')}}>
                    <Text style={styles.text}>Seus Profissionais</Text>
                </TouchableOpacity>
            </View>
            {/* Exibir Conteúdo da seleção */}
            {opcaoSelecionada === "consulta" && (
                <FlatList
                data={consultas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card1}>
                        <Text style={[styles.nome, {fontSize: 16}]}>Consulta</Text>
                        <Text style={styles.nome}>{item.data.toString().split("T")[0]}</Text>
                        <Text style={styles.nome}>Estado: {item.status}</Text>
                    </View>
                )}/>
            )}
            {opcaoSelecionada === "profissional" && (
                <FlatList
                data={profissionaisC}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card1} onPress={() => navigation.navigate("Proficional", {
                        idu: id, nomeu: nome, telefoneu: telefone, emailu: email, passwordu: password, datanascimentou: datanascimento, generou: genero ,
                        id: item.id,
                        nome: item.nome,
                        email: item.email,
                        telefone: item.telefone,
                        datanascimento: item.datanascimento,
                        experiencia: item.tempoexperiencia,
                        areaTrabalho: item.areaT,})}>
                        <Text style={[styles.nome, {fontSize: 16}]}>{item.nome}</Text>
                        <Text style={styles.nome}>{item.areaT}</Text>
                        <Text style={styles.nome}>Experiecia: {item.tempoexperiencia}</Text>
                    </TouchableOpacity>
                )}/>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF3F8',
    },
    titulo: {
        fontSize: 25,
        backgroundColor: '#EEF3F8',
        color: '#000',
        height: 40,
        justifyContent: 'center',
        fontWeight: 'bold',
        borderBottomWidth: 1,
        marginHorizontal: 5,
    },
    header: {
        height: 100,
        backgroundColor: '#C3D5DC',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginBottom: -75,
        zIndex: -1,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
        marginTop: 0,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: "#e7fbe6",
        alignSelf: 'center',
    },
    infoContainer: {
        marginTop: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    encrenagem: {
        alignSelf: 'center',
    },
    Menu: {
        marginTop: 10,
        backgroundColor: '#EEEEEF',
        width: '100%',
        height: 50,
        borderRadius: 10,
        flexDirection: 'row', 
        alignItems: "center", 
        justifyContent: "space-between"
    },
    menu1: {
        marginLeft: 3,
        borderRadius: 10,
        height: '90%',
        width: '50%'
    },
    menu2: {
        marginRight: 40,
        borderRadius: 10,
        height: '90%',
        width: '50%'
    },
    card1: {
        padding: 5,
        backgroundColor: "#4CD964",
        height: 70,
        borderRadius: 20,
        marginTop: 5,
        marginHorizontal: 5,
    },
    text: {
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 15,
    },
    nome: {
        fontSize: 13,
        fontWeight: "bold",
        color: '#fff',
    },
});