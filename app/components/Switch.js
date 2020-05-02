import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { timing } from "../helpers";

export const Switch = (props) => {
  let initColor = "#dddddd";
  let initLeft = 0;
  if (props.state === "emergencyReady") {
    initColor = "rgba(255, 0, 0, 0.4)";
    initLeft = 60;
  }
  const [left] = useState(new Animated.Value(initLeft));
  const [color, setColor] = useState(initColor);

  useEffect(() => {
    if (props.state === "notReady") deactivate();
  }, [props.state]);

  const activate = () => {
    timing(left, 60).start();
    setColor("rgba(255, 0, 0, 0.4)");
  };
  const deactivate = () => {
    timing(left, 0).start();
    setColor("#dddddd");
  };

  const toggle = () => {
    if (props.state !== "emergencyReady") {
      props.enable();
      activate();
    } else {
      props.disable();
      deactivate();
    }
  };

  return (
    <TouchableOpacity
      onPress={toggle}
      style={[styles.container, { backgroundColor: color }]}
    >
      <Animated.View style={[styles.switch, { left }]}>
        <View>
          <Text style={styles.text}>U</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    width: 120,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  switch: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "red",
    backgroundColor: "#d61f2c",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
};
