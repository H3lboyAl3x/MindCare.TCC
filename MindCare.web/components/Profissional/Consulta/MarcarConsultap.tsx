import { getUrl } from "@/app/utils/url";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import axios from "axios";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";

type Consulta = {
  id: number;
  data: string;
  hora: string;
  idpaci: number;
  idpro: number;
  status: string;
  link: string;
};

export default function MarcarConsulta({ navigation, route }) {
    const { idpaci, idpro } = route.params;

    const [datamarcacao, setDatan] = useState<Date | null>(null);
    const [tempomarcacao, settempo] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const pegarData = () => {
        const agora = new Date();
        agora.setHours(0, 0, 0, 0); 
        return agora;
    };
    const Marcar = async () => {
        if (!datamarcacao || !tempomarcacao) {
            Alert.alert("Por favor, selecione a data e a hora antes de marcar a consulta.");
            return;
        }

        const formatarHora = (date: Date) => {
          const horas = date.getHours().toString().padStart(2, '0');
          const minutos = date.getMinutes().toString().padStart(2, '0');
          return `${horas}:${minutos}`;
        };


        const formattedDate = datamarcacao.toISOString().split("T")[0];
        const formattedTime = formatarHora(tempomarcacao);
        try {
          const analisar = await axios.get<Consulta[]>(`${getUrl()}/MindCare/API/consultas`);
          const consultasseparada = analisar.data;
          const consultasfiltrada = consultasseparada.filter((consulta) => 
            consulta.idpro === idpro &&
            consulta.status === "Pendente" &&
            consulta.data.split("T")[0] === formattedDate &&
            consulta.hora.slice(0, 5) === formattedTime
          );        
          
          

          if (!consultasfiltrada[0])
          {
            const response = await axios.post(`${getUrl()}/MindCare/API/consultas`, {
              data: formattedDate,
              hora: formattedTime,
              idpaci: idpaci,
              idpro: idpro,
              status: "Pendente",
              link: `https://meet.jit.si/${formattedDate}`,
            });
            alert("Consulta marcada com sucesso.")
            navigation.goBack();
          }else{
            Alert.alert("Ja tem consulta marcada para esta data e horario!");
          }
        } catch (error) {
            console.error("Erro ao marcar consulta:", error);
        }

    };
  const minimumDate = pegarData();
  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDatan(selectedDate);
    }
    setShowDatePicker(false);
  };
  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (selectedTime) {
      settempo(selectedTime);
    }
    setShowTimePicker(false);
  };

  if(Platform.OS === "web"){
    return (
      <View style={styles.container}>
        <View style={styles.Menu}>
        <Text style={styles.title}>Marcar Consulta</Text>
  
        <TouchableOpacity style={styles.input}>
          <input
            type="date"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: 'transparent',
              textAlign: 'center',
              color: datamarcacao ? '#4CD964' : '#6fcf87',
              cursor: 'pointer',
            }}
            value={
              datamarcacao
                ? `${datamarcacao.getFullYear()}-${(datamarcacao.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}-${datamarcacao.getDate().toString().padStart(2, '0')}`
                : ''
            }
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                const [anoStr, mesStr, diaStr] = value.split('-');
                const ano = parseInt(anoStr, 10);
                const mes = parseInt(mesStr, 10);
                const dia = parseInt(diaStr, 10);
            
                if (!isNaN(ano) && !isNaN(mes) && !isNaN(dia)) {
                  const dataLocal = new Date(ano, mes - 1, dia, 12); // <-- aqui está a mágica
                  setDatan(dataLocal);
                }
              }
            }}            
          />
        </TouchableOpacity>
        
              <TouchableOpacity style={styles.input}>
                <input
                  type="time"
                  style={{
                    width: "100%", height: "100%", border: "none", backgroundColor: "transparent",
                    textAlign: "center", color: tempomarcacao ? "#4CD964" : "#6fcf87"
                  }}
                  value={tempomarcacao ? tempomarcacao.toTimeString().slice(0, 5) : ""}
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(":");
                    const novaHora = new Date();
                    novaHora.setHours(parseInt(hours));
                    novaHora.setMinutes(parseInt(minutes));
                    novaHora.setSeconds(0);
                    settempo(novaHora);
                  }}
                />
              </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={Marcar}>
            <Text style={styles.buttonText}>Marcar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -20,
  },
  Menu: {
    width: '100%',
    height: '80%',
    alignItems: "center",
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: "#4CD964",
    textAlign: "center",
  },
  input: {
    marginTop: 20,
    width: "80%",
    height: 50,
    borderRadius: 50,
    backgroundColor: "#e3e6e3",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#4CD964',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});