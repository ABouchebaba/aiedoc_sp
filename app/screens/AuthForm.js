import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Picker,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Store/actions";
import DatePicker from "../components/DatePicker";
import Button from "../components/Button";
import { BackImage } from "../components/";

const AuthForm = (props) => {
  const dispatch = useDispatch();
  // const { phoneNumber: phone } = props.route.params;
  const phone = "+213555077433";
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [wilaya, setWilaya] = useState({
    nom: "",
    code: "",
  });
  const [region, setRegion] = useState("");
  const [sex, setSex] = useState("");

  const wilayas = require("../helpers/wilayas.json");
  const communes = wilaya == "" ? [] : require("../helpers/communes.json");
  // const communes = []
  const disabled = !(
    email &&
    firstname &&
    lastname &&
    birthdate &&
    wilaya &&
    region &&
    sex
  );
  const loading = useSelector((state) => state.user.loading);

  const submit = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      // console.log({ phone, email, firstname, lastname, birthdate, wilaya,commune:region  });
      props.navigation.navigate("AuthProForm", {
        phone,
        email,
        firstname,
        lastname,
        birthdate,
        wilaya: wilaya.nom,
        commune: region,
        sex: sex
      });
      // dispatch(register({ phone, email, firstname, lastname, birthdate }));
    } else {
      return Alert.alert("Erreur", "Adresse mail incorrecte");
    }
    // register user in backend@
  };

  return (
    <BackImage source={require("../../assets/bg/bg1.png")}>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <View style={styles.mainView}>
          <Text style={styles.title}>Informations personnelle</Text>
          <View style={styles.row}>
            <View style={{ flex: 0.48 }}>
              <Text style={styles.label}>Prénom</Text>
              <TextInput
                placeholder="Elon"
                onChangeText={setFirstname}
                autoCompleteType="name"
                textContentType="givenName"
                style={styles.RowTextInput}
              />
            </View>
            <View style={{ flex: 0.48 }}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                placeholder="Musk"
                onChangeText={setLastname}
                autoCompleteType="name"
                textContentType="familyName"
                style={styles.RowTextInput}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 0.6 }}>
              <Text style={styles.label}>Date de naissance</Text>
              <DatePicker
                title="Date de naissance"
                onChange={setBirthdate}
                value={birthdate}
                style={styles.TextInput}
              />
            </View>
            <View style={{ flex: 0.35 }}>
              <Text style={styles.label}>Sexe</Text>
              <View style={styles.buttonWhite}>
              <Picker
                selectedValue={sex}
                onValueChange={(itemValue) => setSex(itemValue)}
              >
                <Picker.Item color="#006592" label={"Homme"} value={"male"} />
                <Picker.Item color="#006592" label={"Femme"} value={'female'} />
              </Picker>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 0.48 }}>
              <Text style={styles.label}>Wilaya</Text>
              <View style={styles.buttonWhite}>
                <Picker
                  selectedValue={wilaya}
                  onValueChange={(itemValue) => setWilaya(itemValue)}
                >
                  {wilayas.map((v, i) => {
                    return (
                      <Picker.Item
                        color="#006592"
                        label={v.nom}
                        value={v}
                        key={i}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View style={{ flex: 0.48 }}>
              <Text style={styles.label}>Commune</Text>
              <View style={styles.buttonWhite}>
                <Picker
                  selectedValue={region}
                  onValueChange={(value) => setRegion(value)}
                >
                  {communes
                    .filter((commune) => commune.wilaya_id === wilaya.code)
                    .map((v, i) => {
                      return (
                        <Picker.Item
                          color="#006592"
                          label={v.nom}
                          value={v.nom}
                          key={i}
                        />
                      );
                    })}
                </Picker>
              </View>
            </View>
          </View>
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            style={{ ...styles.TextInput, width: "90%" }}
          />
          <Button title="Register" onPress={submit} disabled={disabled} />
        </View>
      )}
    </BackImage>
  );
};

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    color: "white",
    marginBottom: 20,
  },
  TextInput: {
    backgroundColor: "#F2F2F2",
    width: "100%",
    borderRadius: 50,
    paddingLeft: 20,
    fontSize: 20,
    paddingVertical: 10,
    marginBottom: 40,
  },
  RowTextInput: {
    backgroundColor: "#F2F2F2",
    width: "100%",
    borderRadius: 50,
    paddingLeft: 20,
    fontSize: 20,
    paddingVertical: 10,
    marginBottom: 40,
  },
  buttonWhite: {
    backgroundColor: "#F2F2F2",
    borderRadius: 50,
    paddingLeft: 20,
    fontSize: 20,
    marginBottom: 40,
  },
  row: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  label: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
  },
});

export default AuthForm;
