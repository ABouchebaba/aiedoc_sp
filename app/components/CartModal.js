import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert
} from "react-native";
// import { getLocationForCommand } from "../Store/actions";
import RNPickerSelect from "react-native-picker-select";

const wilayas = require('../helpers/wilayas.json')

export const CartModal = (props) => {
  // const intervention = props.intervention
  const [address, setAdresse] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [location, setLocation] = useState({});

  // useEffect(() => {
  //   getLocationForCommand().then((res) => {
  //     console.log(res);
  //     setLocation(res);
  //   });
  // }, []);

  function submit() {
    if (address.length > 10 && wilaya !== "") {
      const data = {
        address: address,
        wilaya: wilaya,
        // location: location,
      };
      setAdresse('')
      setWilaya('')
      setLocation({})
      return props.submit(data);
    }
    Alert.alert("Erreur", "Veuillez compléter le formulaire");
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModel}
      onRequestClose={props.close}
    >
      <View style={styles.modelCard}>
        <Text style={styles.title}>Veuillez compléter le formulaire</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.text}>Adresse</Text>
          <TextInput
            editable={true}
            value={address}
            autoCompleteType="street-address"
            keyboardType="default"
            textContentType="streetAddressLine1"
            onChangeText={setAdresse}
            style={styles.TextInput}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.text}>Wilaya</Text>
          <View style={styles.wilayaInput}>
            <RNPickerSelect
              placeholder={{
                label: "Wilaya...",
                value: "",
                color: "black",
              }}
              value={wilaya}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 10,
                  right: 12,
                },
              }}
              onValueChange={(value) => setWilaya(value)}

              items={wilayas.map((x) => ({
                label: x.code+'- '+x.nom,
                value: x.nom,
              }))}
            />
          </View>
        </View>
        <TouchableOpacity onPress={submit} style={styles.submit}>
          <Text style={{ fontSize: 27, color: "white" }}>Vérifier</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.close} style={styles.resend}>
          <Text style={{ fontSize: 15, color: "black" }}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modelCard: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#11A0C1",
    borderTopWidth: 10,
    borderColor: "#09748D",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginBottom: 50,
  },
  inputGroup: {
    width: "100%",
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 0,
  },
  text: {
    textAlign: "left",
    fontSize: 20,
    color: "white",
    paddingBottom: 10,
    paddingLeft: 5,
  },
  TextInput: {
    backgroundColor: "#F2F2F2",
    alignSelf: "center",
    width: "100%",
    borderRadius: 50,
    paddingLeft: 20,
    fontSize: 15,
    paddingVertical: 10,
    marginBottom: 40,
    color: "#0F95B9",
  },
  wilayaInput: {
    backgroundColor: "#F2F2F2",
    alignSelf: "center",
    width: "100%",
    borderRadius: 50,
    paddingLeft: 20,
    fontSize: 15,
    paddingVertical: 10,
    marginBottom: 40,
  },
  submit: {
    backgroundColor: "#09748D",
    marginTop: 30,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 50,
    width: "80%",
    alignSelf: "center",
  },
  resend: {
    backgroundColor: "white",
    marginTop: 30,
    paddingVertical: 6,
    alignItems: "center",
    borderRadius: 50,
    width: "30%",
    alignSelf: "center",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    borderRadius: 20,
    color: "#0F95B9",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    // backgroundColor: "white",
    fontSize: 18,
    borderColor: "purple",
    color: "#0F95B9",
    // paddingRight: 30, // to ensure the text is never behind the icon
  },
});
