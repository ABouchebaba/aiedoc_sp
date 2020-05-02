import React, { useState } from "react";
import { View, TextInput, Button, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Store/actions";

const AuthPin = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const [verificationCode, setVerificationCode] = useState("");
  // const { phoneNumber, verificationId } = props.route.params;
  const phoneNumber = "+213556276461";
  const verificationId = "azerty";

  const onPinError = () => {
    alert("Wrong pin code");
  };
  const onVerfiyPhoneError = (err) => {
    props.navigation.navigate("AuthForm", { phoneNumber });
  };

  const onPressConfirmVerificationCode = async () => {};
  // dispatch(
  //   login(
  //     {
  //       phoneNumber,
  //       verificationId,
  //       verificationCode,
  //     },
  //     {
  //       onPinError,
  //       onVerfiyPhoneError,
  //     }
  //   )
  // );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={styles.TextInput}>
            <TextInput
              placeholder="type in pin code ..."
              onChangeText={setVerificationCode}
            />
          </View>
          <Button title="Submit" onPress={onPressConfirmVerificationCode} />
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  TextInput: {
    backgroundColor: "white",
    width: "60%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#efefef",
    borderRadius: 20,
    marginBottom: 10,
  },
};

export default AuthPin;
