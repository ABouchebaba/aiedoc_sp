import React, { useEffect } from "react";
import { Modal, StyleSheet } from "react-native";
import { BackImage } from "./BackImage";

export const CommandSetModal = (props) => {
 
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.done}
      // onRequestClose={props.close}
    >
      <BackImage 
        source={require("../../assets/bg/command.png")}
      />
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
});

