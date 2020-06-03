import { Entypo, FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { InterventionModel } from "./InterventionModel";
import { useDispatch, useSelector } from "react-redux";
import { getInterventions } from "../Store/actions";

export const Interventions = (props) => {
  
  const { interventions, loading } = props.data

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    props.getInt()
    setRefreshing(false);
  }, [refreshing, interventions]);

  // const interventions = props.interventions
  const [intervention, setIntervention] = useState({
    open: false,
    services: [],
  });

  function close() {
    setIntervention({ open: false, services: [] });
  }

  function interventionModel(services) {
    setIntervention({ open: true, services: services });
  }

  return loading ? (
    <View style={styles.scrollContain}>
      <ActivityIndicator size="large" color="#11A0C1" />
    </View>
  ) : (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {interventions.map((inv, i) => (
        inv.state === "validated" &&
        <TouchableOpacity
          key={i}
          style={styles.card}
          onPress={() => interventionModel(inv.services)}
        >
          <View style={styles.leftSide}>
            <Entypo name="calendar" size={20} color="gray">
              <Text style={styles.text}> {inv.createdAt.slice(0, 10)}</Text>
            </Entypo>
            <Entypo name="price-tag" size={20} color="#FFD700">
              <Text style={styles.text}> {inv.totalPrice} DA</Text>
            </Entypo>
            <FontAwesome name="user-md" size={20} color="green">
              <Text style={styles.text}> {inv.services.length} serivce(s)</Text>
            </FontAwesome>
          </View>
          <View style={styles.rightSide}>
            <Text style={{...styles.text,fontSize:15}}>Rating</Text>
            <View style={styles.ratingView}>
              {[...Array(inv.client_rating)].map((x, i) => (
                <Entypo key={i} name="star" size={30} color="#FFD700"></Entypo>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <InterventionModel
        close={close}
        showModel={intervention.open}
        services={intervention.services}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#cadce6",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  card: {
    height: 120,
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 10,
    padding: 15,
    // shadow style
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  leftSide: {
    justifyContent: "space-around",
    flex: 1,
    width: "50%",
  },
  rightSide: {
    width: "50%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingView: {
    flexDirection: "row",
  },
  text: {
    color: "black",
    fontSize: 18,
  },
  scrollContain: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 4,
    backgroundColor: "#cadce6",
  },
});
