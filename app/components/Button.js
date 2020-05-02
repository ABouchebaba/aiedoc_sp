import React from "react";
import { TouchableOpacity, Text } from "react-native";

const Button = (props) => {
  const style = props.disabled ? styles.notSubmit : styles.submit;
  const textStyle = props.disabled ? styles.textDisabled : styles.textEnabled;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{...style,...props.style}}
      disabled={props.disabled}
    >
      <Text style={{...textStyle,...props.textStyle}}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textEnabled: { fontSize: 27, color: "white" },
  textDisabled: { fontSize: 27, color: "#4a4a4a" },
  submit: {
    backgroundColor: "#11A0C1",
    marginTop: 30,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 50,
    width: "70%",
    alignSelf: "center",
  },
  notSubmit: {
    backgroundColor: "#bababa",
    marginTop: 30,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 50,
    width: "70%",
    alignSelf: "center",
  },
};
export default Button;
