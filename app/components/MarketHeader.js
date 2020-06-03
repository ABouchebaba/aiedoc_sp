import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export const MarketHeader = (props) => {
  const { cart } = useSelector((state) => state.cart);
  const navigation = useNavigation();

  return (
    <View style={styles.image}>
      <TouchableOpacity onPress={navigation.openDrawer}>
        <Entypo name="menu" size={60} color="white" style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("StoreHome")}>
        <Image
          style={styles.tinyLogo}
          source={require("../../assets/boutique.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        {cart.length === 0 ? (
          <Image
            style={{width:55,height:55,resizeMode:'contain'}}
            source={require("../../assets/empty_cart.png")}
          />
        ) : (
          <>
            <Text style={styles.text}>{cart.length}</Text>
            <Image
              style={{width:50,height:50,resizeMode:'contain'}}
              source={require("../../assets/fill_cart.png")}
            />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    alignSelf: "center",
    width: "90%",
  },
  tinyLogo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  logo: {
    width: 60,
    height: 60,
  },
  text: {
    color: "white",
    backgroundColor: "red",
    textAlign: "center",
    width: 20,
    height: 20,
    borderRadius: 50,
    fontWeight: "bold",
  },
});
