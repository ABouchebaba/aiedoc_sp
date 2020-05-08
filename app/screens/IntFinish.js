import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrent} from '../Store/actions';
import {Socket, AppStateEvents} from '../helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BackImage} from '../components';

const IntFinish = (props) => {
  const dispatch = useDispatch();
  const {intervention, loading} = useSelector((state) => state.current);
  const phoneNumber = '0556276461';
  const socket = Socket.getInstance();
  socket.sync(intervention._id);

  const responses = {
    goFacture: (intervention) => dispatch(setCurrent(intervention)),
  };
  socket.addEvents(responses);

  useEffect(() => {
    console.log('adding sync event');
    AppStateEvents.addNamedEvent('finish-sync', 'change', (nextAppState) => {
      if (nextAppState === 'active') {
        // trigger on foreground only
        console.log('sync event');
        socket.sync(intervention._id);
        socket.addEvents(responses);
      }
    });
    return () => {
      console.log('removing sync event finish');
      AppStateEvents.removeNamedEvent('finish-sync');
      // socket.destroy();
    };
  }, []);

  const finish = () => {
    console.log('finishing');
    console.log(socket.isInitialized());
    socket.emit('finish', intervention._id);
  };

  const call = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <BackImage source={require('../../assets/bg/bg1.png')}>
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
