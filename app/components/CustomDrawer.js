import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/actions";
const { width, height } = Dimensions.get("screen");

export function CustomDrawerContent(props) {
  const disconnectAtempt = () => {
    Alert.alert(
      "Déconnexion",
      "Etes vous sur de vouloir déconnecter ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => dispatch(logout()) },
      ],
      { cancelable: true }
    );
  };
  const dispatch = useDispatch();
  const { firstname, lastname } = useSelector((state) => state.user.user);
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} style={{ flex: 1, height: height }}>
        <View style={styles.mainView}>
          <Text style={styles.firstLetter}>
            {firstname.charAt(0).toUpperCase()}
          </Text>
          <View style={styles.profileView}>
            <Text style={styles.fullName}>
              {firstname.charAt(0).toUpperCase() + "." + lastname}
            </Text>
          </View>
        </View>
        <DrawerItemList
          {...props}
          // itemStyle={styles.items}
          // labelStyle={styles.label}
        />
      </DrawerContentScrollView>
      <View style={styles.propos}>
        <TouchableOpacity
          style={styles.disconnectItem}
          onPress={disconnectAtempt}
        >
          <Text style={styles.disconnectLabel}>Déconnexion</Text>
        </TouchableOpacity>
        {/* <Image source={require("../../assets/logo.png")} style={styles.image} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  mainView: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#707070",
    alignItems: "stretch",
    height: height * 0.12,
  },
  firstLetter: {
    marginLeft: 10,
    backgroundColor: "#4EC7E6",
    fontSize: 45,
    width: 60,
    height: 60,
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 50,
    color: "white",
  },
  profileView: {
    alignSelf: "center",
    marginRight: 30,
    flex: 1,
  },
  fullName: {
    fontSize: 22,
    color: "#4EC7E6",
    textAlign: "center",
  },
  consult: {
    fontSize: 15,
    color: "#959595",
    textAlign: "center",
  },
  items: {
    height: height * 0.1,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: "#1FB8E0",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 25,
    color: "#48C2E3",
  },
  disconnectItem: {
    height: height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e01f1f",
  },
  disconnectLabel: {
    fontSize: 20,
    color: "white",
  },
  propos: {
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#1FB8E0",
    position: "absolute",
    bottom: 0,
  },
  proposText: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    backgroundColor: "red",
  },
  image: {
    alignSelf: "center",
    width: 100,
    resizeMode: "contain",
  },
});
