import React from "react";
import { View, ImageBackground, StatusBar, StyleSheet } from "react-native";

export const BackImage = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#11A0C1" barStyle={"light-content"} />
      <ImageBackground source={props.source} style={styles.image}>
        {props.children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: StatusBar.currentHeight,
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "center",
  },
});
