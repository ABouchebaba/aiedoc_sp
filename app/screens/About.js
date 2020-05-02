import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/actions";
import socketIOClient from "socket.io-client";
import { BACKEND_URL } from "react-native-dotenv";

const About = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    //
    const s = socketIOClient("http://192.168.43.19:4002/");
    setSocket(s);
    s.on("message", (data) => {
      alert(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>About screen</Text>
      <Text>
        user : {user.name} with email: {user.email}
      </Text>
      <TouchableOpacity onPress={() => socket.emit("accept")}>
        <Text>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => socket.emit("refuse")}>
        <Text>Refuse</Text>
      </TouchableOpacity>
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
};

export default About;
