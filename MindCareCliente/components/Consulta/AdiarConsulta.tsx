import { getUrl } from "@/app/utils/url";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import axios from "axios";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";

export default function AdiarConsulta({ navigation, route }) {
    const {idConsulta, dataConsulta, horaConsulta, idpaci, idpro} = route.params;

    const [datamarcacao, setDatan] = useState<Date | null>(dataConsulta ? new Date(dataConsulta) : null);
    const [tempomarcacao, settempo] = useState<Date | null>(horaConsulta ? new Date(`1970-01-01T${horaConsulta}`) : null);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const pegarData = () => {
        const agora = new Date();
        agora.setHours(0, 0, 0, 0);
        return agora;
    };
    const Adiar = async () => {
        if (!datamarcacao || !tempomarcacao) {
            Alert.alert("Por favor, selecione a data e a hora antes de marcar a consulta.");
            return;
        }
        const formattedDate = datamarcacao.toISOString().split("T")[0];
        const formattedTime = tempomarcacao.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", hour12: false });
        try {
            await axios.put(`${getUrl()}/MindCare/API/consultas/${idConsulta}`, {
                data: formattedDate,
                hora: formattedTime,
                idpaci: idpaci,
                idpro: idpro,
                status: "Adiada",
            });
            alert("Consulta Adiada com socesso!")
            navigation.goBack();
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

  return (
    <View style={styles.container}>
      <View style={styles.Menu}>
      <Text style={styles.title}>Adiar Consulta</Text>

{/* Botão para selecionar DATA */}
<TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
  <Text style={{ color: datamarcacao ? "#4CD964" : "#6fcf87" }}>
    {datamarcacao ? datamarcacao.toLocaleDateString("pt-BR") : dataConsulta}
  </Text>
</TouchableOpacity>

{showDatePicker && (
  <DateTimePicker
    value={datamarcacao || new Date()}
    mode="date"
    display="spinner"
    minimumDate={minimumDate}
    onChange={onDateChange}
  />
)}

{/* Botão para selecionar HORA */}
<TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
  <Text style={{ color: tempomarcacao ? "#4CD964" : "#6fcf87" }}>
    {tempomarcacao ? tempomarcacao.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : horaConsulta}
  </Text>
</TouchableOpacity>

{showTimePicker && (
  <DateTimePicker
    value={tempomarcacao || new Date()}
    mode="time"
    display="spinner"
    onChange={onTimeChange}
  />
)}
<TouchableOpacity style={styles.button} onPress={Adiar}>
  <Text style={styles.buttonText}>Adiar</Text>
</TouchableOpacity>
      </View>
    </View>
  );
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