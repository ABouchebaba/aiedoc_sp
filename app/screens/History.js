import { Entypo } from "@expo/vector-icons";
import React, {useEffect} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BackImage, Interventions } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getInterventions } from "../Store/actions";

const History = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.history);
  const { _id } = useSelector((state) => state.user.user);
  
  function getInt(){
    console.log("hi")
    dispatch(getInterventions(_id));
  }

  useEffect(() => {
    getInt()
    console.log("interventions effect");
  }, [dispatch]);

  return (
    <BackImage source={require("../../assets/bg/bgHome.png")}>
      <View style={styles.header}>
        <TouchableOpacity onPress={props.navigation.openDrawer}>
          <Entypo name="menu" size={50} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.mainView}>
        <View style={styles.head}>
          <Text style={styles.text}>MES PRESTATIONS ({data.interventions.filter(inv => inv.state ==="validated").length}) </Text>
        </View>
        <Interventions data={data} getInt={getInt} />
      </View>
    </BackImage>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
  },
  header: {
    height: "10%",
    width: "100%",
    justifyContent: "center",
    paddingLeft: 30,
  },
  mainView: {
    height: "90%",
    width: "100%",
  },
  head: {
    backgroundColor: "white",
    height: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#11A0C1",
  },
});

export default History;
