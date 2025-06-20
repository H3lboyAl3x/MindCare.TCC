import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image} from "react-native";
import axios from "axios";
import { getUrl } from "@/app/utils/url";
import Consulta from "@/components/Paciente/Consulta/Consulta";

type Consulta = {
  id: number;
  data: string;
  hora: string;
  idpaci: number;
  idpro: number;
  status: string;
  link: string;
};

export default function ListaConsulta({ navigation }) {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [selecionada, setSelecionada] = useState<Consulta | null>(null);
  const [nomeprof, setNomeprof] = useState<string | null>(null);
  const [nomepaci, setNomepaci] = useState<string | null>(null);
  const [status,setSatus] = useState<string | null>(null);


  const buscarConsultas = async () => {
    try {
      const responde = await axios.get<Consulta[]>(`${getUrl()}/MindCare/API/consultas`);
      const consultasseparada = responde.data;
      setConsultas(consultasseparada);
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  };

  const pegarprofissional = async (consulta: Consulta) => {
    try {
        const user = await axios.get(`${getUrl()}/MindCare/API/users/${consulta.idpro}`);
        setNomeprof(user.data.nome);
        setSatus(consulta.status);
    } catch (error) {
        console.error("Erro ao buscar profissionais:", error);
    }
  };
  const pegarpaciente = async (consulta: Consulta) => {
    try{
        const user = await axios.get(`${getUrl()}/MindCare/API/users/${consulta.idpaci}`)
        setNomepaci(user.data.nome);
        setSatus(consulta.status);
    } catch (error) {
        console.error("Erro ao buscar paciente:", error );
    }
  }

  useEffect(() => {
    buscarConsultas();
    const intervalo = setInterval(buscarConsultas, 1000);
    return () => clearInterval(intervalo);
    }, []);

  useEffect(() => {
    if (selecionada) {
        pegarpaciente(selecionada);
        pegarprofissional(selecionada);
    }
    }, [selecionada]);
  

  const Analisar = (consulta: Consulta) => {
    setSelecionada(consulta);
  };

  const Apagarconsulta = async (consulta: Consulta) => {
        try {
            await axios.put(`${getUrl()}/MindCare/API/consultas/${consulta.id}`, {
              data: consulta.data,
              hora: consulta.hora,
              idpaci: consulta.idpaci,
              idpro: consulta.idpro,
              status: "Cancelada por emergencia",
              link: ``,
            });
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao cancelar consulta:", error);
        }
    };


  const renderAnalisarWeb = () => {
    if (!selecionada) {
      return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: "#e3e6e3" }}>
          <Text style={{ color: '#000' }}>
            Selecione uma consulta para visualizar os detalhes.
          </Text>
        </View>
      );
    }
    const formattedDate = new Date(selecionada.data).toISOString().split("T")[0];
    const formattedTime = selecionada.hora.slice(0, 5);

    if(status === "Pendente")
    {
        return (
            <View style={{flex: 1, backgroundColor: "#37C231", alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: '#fff', textAlign: 'center'}}>Consultas com: Profissional:{nomeprof} e Paciente:{nomepaci}</Text>
                <Image source={require('../../../assets/images/trevo.jpg')} style={styles.logo}/>
                <Text style={{fontSize: 25, color: "#fff", backgroundColor: '#2a8c26', borderRadius: 10, marginTop: 5}}>Data: {formattedDate}     |     Hora: {formattedTime}</Text>
                <Text style={{fontSize: 20, color: "#fff", backgroundColor: '#2a8c26', borderBottomEndRadius: 10, borderBottomStartRadius: 10}}>Status: {status}</Text>
                <TouchableOpacity style={{width: "40%", height: 45,  backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 50, marginTop: 10 }} onPress={() => Apagarconsulta(selecionada!)}><Text style={[styles.buttonText, { color: '#fa393d' }]}>Cancelamento de emergencia</Text></TouchableOpacity>
            </View>
        );
    }else{
        return (
            <View style={{flex: 1, backgroundColor: "#37C231", alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: '#fff', textAlign: 'center'}}>Consultas com: Profissional:{nomeprof} e Paciente:{nomepaci}</Text>
                <Image source={require('../../../assets/images/trevo.jpg')} style={styles.logo}/>
                <Text style={{fontSize: 25, color: "#fff", backgroundColor: '#2a8c26', borderRadius: 10, marginTop: 5}}>Data: {formattedDate}     |     Hora: {formattedTime}</Text>
                <Text style={{fontSize: 20, color: "#fff", backgroundColor: '#2a8c26', borderBottomEndRadius: 10, borderBottomStartRadius: 10}}>Status: {status}</Text>
            </View>
        );
    }
  };

  const renderLista = () => (
    <>
      {consultas.length === 0 ? (
        <View>
          <Image
            source={require('../../../assets/images/mente.png')}
            style={styles.logo}
          />
          <Text style={{ textAlign: "center", marginTop: 30, color: "#000" }}>
            Nenhuma consulta registrada pelo sistema!
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.Inf}
          data={consultas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => Analisar(item)}>
              <View>
                <Text style={[styles.consultaText, { fontWeight: "bold", fontSize: 16 }]}>Consulta</Text>
                <Text style={styles.consultaText}>Profissional:{nomeprof}</Text>
                <Text style={styles.consultaText}>Paciente:{nomepaci}</Text>
                <Text style={styles.consultaText}>Data: {item.data ? item.data.toString().split("T")[0] : ""}</Text>
                <Text style={styles.consultaText}>Hora: {item.hora.slice(0, 5)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );

  return (
    <View style={[styles.container, { flexDirection: "row"}]}>
      <View style={{ width: "30%", borderRightWidth: 2, borderColor: "#2E8B57" }}>
        {renderLista()}
      </View>
      <View style={{ flex: 1 }}>{renderAnalisarWeb()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 20,
    backgroundColor: "#e7fbe6",
    marginTop: 50,
    alignSelf: "center",
  },
  card: {
    padding: 15,
    backgroundColor: "#4CD964",
    height: 100,
    borderRadius: 20,
    marginTop: 5,
    marginHorizontal: 5,
  },
  consultaText: {
    fontSize: 14,
    color: "#fff",
  },
  Inf: {
    backgroundColor: "#fff",
  },
  Vbotao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 200,
  },
  botao: {
    width: 200,
    height: 50,
    marginHorizontal: 25,
    backgroundColor: "#4CD964",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#4CD964",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    justifyContent: "center",
  },
});