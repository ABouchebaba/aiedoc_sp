import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
} from "react-native";
import { sendPin, getOptions } from "../Store/api";
import { login } from "../Store/actions";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseAuthApplicationVerifier,
} from "expo-firebase-recaptcha";
import { TouchableOpacity } from "react-native-gesture-handler";

const AuthPhone = (props) => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(
    FirebaseAuthApplicationVerifier
  );
  const [step, setStep] = useState(0);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState("");

  const textinput = React.createRef();

  const onPressSendVerificationCode = () => {
    const number = "+213" + phoneNumber.slice(1);
    sendPin(number, recaptchaVerifier)
      .then((res) => {
        setVerificationId(res);
        setPhoneNumber(number);
        setStep(1);
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid phone number");
      });
  };
  const loading = useSelector((state) => state.user.loading);
  const onPinError = () => {
    alert("Wrong pin code");
  };
  const onVerfiyPhoneError = (err) => {
    restartProcess();
    props.navigation.navigate("AuthForm", { phoneNumber });
  };
  const restartProcess = () => {
    setVerificationId("");
    setPhoneNumber("");
    setVerificationCode("");
    setStep(0);
  };
  const onPressConfirmVerificationCode = async () =>
    dispatch(
      login(
        { phoneNumber, verificationId, verificationCode },
        { onPinError, onVerfiyPhoneError }
      )
    );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg/bg1.png")}
        style={styles.image}
      >
        {step === 0 && (
          <>
            <FirebaseRecaptchaVerifierModal
              ref={setRecaptchaVerifier}
              firebaseConfig={getOptions()}
            />
            <View style={styles.mainView}>
              <Text style={{ fontSize: 22, color: "white", marginBottom: 10 }}>
              Entrez votre numéro de téléphone
              </Text>
              <View style={styles.inputView}>
                <Text style={{ fontSize: 27, padding: 10 }}>+213</Text>
                <TextInput
                  placeholder="0123456789"
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  style={styles.TextInput}
                  ref={textinput}
                  onChangeText={(e) => setPhoneNumber(e)}
                />
              </View>
              <TouchableOpacity
                onPress={onPressSendVerificationCode}
                style={styles.submit}
              >
                <Text style={{ fontSize: 27, color: "white" }}>Vérifier</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {step === 1 &&
          (loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <>
              <TextInput
                autoFocus
                onChangeText={setVerificationCode}
                maxLength={6}
                keyboardType="number-pad"
                textContentType="postalCode"
                style={{ width: 1 }}
              />
              <TouchableOpacity
                style={styles.pinView}
                //add ref onPress={textinput.current.focus()}
              >
                <Text style={styles.pin}>
                  {verificationCode.charAt(0) || " "}
                </Text>
                <Text style={styles.pin}>
                  {verificationCode.charAt(1) || " "}
                </Text>
                <Text style={styles.pin}>
                  {verificationCode.charAt(2) || " "}
                </Text>
                <Text style={styles.pin}>
                  {verificationCode.charAt(3) || " "}
                </Text>
                <Text style={styles.pin}>
                  {verificationCode.charAt(4) || " "}
                </Text>
                <Text style={styles.pin}>
                  {verificationCode.charAt(5) || " "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onPressConfirmVerificationCode}
                style={styles.submit}
              >
                <Text style={{ fontSize: 27, color: "white" }}>Vérifier</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={restartProcess} style={styles.resend}>
                <Text style={{ fontSize: 15, color: "black" }}>Renvoyer</Text>
              </TouchableOpacity>
            </>
          ))}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  mainView: {
    paddingHorizontal: "8%",
  },
  inputView: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 50,
  },
  TextInput: {
    backgroundColor: "#F2F2F2",
    flex: 1,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    paddingLeft: 10,
    fontSize: 27,
  },
  submit: {
    backgroundColor: "#11A0C1",
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
  pinView: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "75%",
  },
  pin: {
    fontSize: 30,
    backgroundColor: "white",
    width: 40,
    height: "auto",
    borderRadius: 10,
    alignSelf: "center",
    textAlign: "center",
  },
});

export default AuthPhone;
