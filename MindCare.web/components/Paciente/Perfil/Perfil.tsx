import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, Image } from "react-native";
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
   genero: string;
}

interface ProfissionalComNome {
   id: number;
   nome: string;
   email: string;
   telefone: string;
   datanascimento: string;
   genero: string;
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

export default function Perfil01({navigation, route}){
    const {id, nome, telefone, email, password, datanascimento, genero} = route.params;
    const [opcaoSelecionada, setOpcaoSelecionada] = useState<"consulta" | "profissional">("consulta");
    const [consultas, setconsultas] = useState<Consultas[]>();
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
                    genero: userResponse.data.genero,
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
                    genero: "Desconhecido",
                    areaT: "Desconhecida",
                    tempoexperiencia: 0,
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
    if(Platform.OS === 'web'){
        return(
            <View style={[styles.container, { padding: 30, backgroundColor: '#EEF3F8' }]}>
                <View style={{ height: 150, backgroundColor: '#C3D5DC', borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 40 }} />
                <View style={{
                    backgroundColor: '#fff',
                    padding: 20,
                    borderRadius: 8,
                    marginTop: -50,
                    marginHorizontal: 'auto',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image
                                source={require('../../../assets/images/person.png')}
                                style={styles.avatar}
                              />
                <View style={{ marginLeft: 20 }}>
                                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{nome}</Text>
                                            <TouchableOpacity
                                                style={{ marginTop: 10 }}
                                                onPress={() => navigation.navigate('ExibirInformacao', {
                                                    id: id,
                                                    nome: nome,
                                                    telefone: telefone,
                                                    email: email,
                                                    datanascimento: datanascimento,
                                                    genero: genero,
                                                    idadm: 0,
                                                    emailadm: '',
                                                    passwordadm: ''
                                                })}
                                            >
                                                <Text style={{color: '#c0c0c0'}}>Ver Detalhes</Text>
                                            </TouchableOpacity>
                                        </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.Menu, {marginTop: 10}]}>
                    <TouchableOpacity style={[styles.menu1, {backgroundColor: cormenu1}]} onPress={() =>{ Funcaobotao1(); setOpcaoSelecionada('consulta')}}>
                        <Text style={styles.text}>Lista de consultas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.menu2, {backgroundColor: cormenu2}]} onPress={() =>{ Funcaobotao2(); setOpcaoSelecionada('profissional')}}>
                        <Text style={styles.text}>Lista de Psicologos</Text>
                    </TouchableOpacity>
                </View>
                {/* Exibir Conteúdo da seleção */}
                {opcaoSelecionada === "consulta" && (
                    <FlatList
                    data={consultas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
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
                        <View style={styles.card}>
                            <Text style={[styles.nome, {fontSize: 16}]}>{item.nome}</Text>
                            <Text style={styles.nome}>{item.areaT}</Text>
                            <Text style={styles.nome}>Experiecia: {item.tempoexperiencia}</Text>
                        </View>
                    )}/>
                )}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    quadro: {
        marginTop: 40,
        backgroundColor: '#4CD964',
        width: '95%',
        height: 200,
        alignSelf: 'center',
        borderRadius: 25,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: "#e7fbe6",
    },
    bfoto: {
        position: "absolute", 
        top: 180,
        left: 140,
        width: 115,
        height: 115,
        borderColor: '#4CD964',
        borderWidth: 2,
        borderRadius: 60,
    },
    foto: {
        width: 110,
        height: 110,
        borderRadius: 60,
        borderWidth: 5,
        borderColor: 'white',
        backgroundColor: 'white',
    },
    encrenagem: {
        position: "absolute", 
        top: 35,
        left: 130,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#4CD964'
    },
    Menu: {
        marginTop: 130,
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
    text: {
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 15,
    },
    card: {
        backgroundColor: "#4CD964",
        padding: 10,
        borderRadius: 20,
        marginTop: 5,
        marginHorizontal: 5,
    },
    nome: {
        fontSize: 13,
        fontWeight: "bold",
        color: '#fff',
    },
});