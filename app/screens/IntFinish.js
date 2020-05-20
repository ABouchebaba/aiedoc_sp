import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {initSocket} from '../Store/api';
import {Socket} from '../helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BackImage, LoadingModal} from '../components';
import {BACKEND_URL} from 'react-native-dotenv';

const IntFinish = (props) => {
  const dispatch = useDispatch();
  const {intervention, client, loading} = useSelector((state) => state.current);

  const socket = Socket.getInstance();

  useEffect(() => {
    if (!socket.isInitialized()) {
      socket.init(BACKEND_URL, initSocket(dispatch, intervention._id));
    }
  }, []);

  const finish = () => {
    socket.emit('finish', intervention._id);
  };

  const call = () => {
    Linking.openURL(`tel:${client.phone}`);
  };

  return (
    <BackImage source={require('../../assets/bg/bg1.png')}>
      <LoadingModal showModal={loading} text="synchronisation" />
      <View>
        <Text style={styles.callText}>
          Appuyer sur le bouton ci-dessous pour contacter le client.
        </Text>
        <TouchableOpacity style={styles.call} onPress={call}>
          <Ionicons name="md-call" size={60} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.finish} onPress={finish}>
          <Text style={styles.finishText}>Préstation terminée ?</Text>
          <Text style={styles.finishText}>Passer à la facture</Text>
        </TouchableOpacity>
      </View>
    </BackImage>
  );
};

const styles = {
  callText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    margin: 20,
  },
  call: {
    width: 70,
    height: 70,
    backgroundColor: '#5cb85c',
    borderRadius: 35,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  finish: {
    backgroundColor: '#428bca',
    borderRadius: 10,
    maxWidth: 300,
    marginTop: 50,
    padding: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  finishText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
};

export default IntFinish;
