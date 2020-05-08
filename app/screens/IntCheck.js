import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Socket, AppStateEvents} from '../helpers';
import {unsetCurrent, setCurrent} from '../Store/actions';
import Entypo from 'react-native-vector-icons/Entypo';
import {BackImage} from '../components';

const IntCheck = (props) => {
  const dispatch = useDispatch();
  const {intervention, loading} = useSelector((state) => state.current);
  const socket = Socket.getInstance();
  socket.sync(intervention._id);

  const responses = {
    refused: (int_id) => dispatch(unsetCurrent()),
    goWait: (intervention) => dispatch(setCurrent(intervention)),
  };
  socket.addEvents(responses);

  useEffect(() => {
    console.log('adding sync event');
    console.log(Object.keys(intervention));
    AppStateEvents.addNamedEvent('check-sync', 'change', (nextAppState) => {
      if (nextAppState === 'active') {
        // trigger on foreground only
        console.log('sync event');
        socket.sync(intervention._id);
        socket.addEvents(responses);
      }
    });
    return () => {
      console.log('removing sync event : check');
      AppStateEvents.removeNamedEvent('check-sync');
      // socket.destroy();
    };
  }, []);

  const accept = () => {
    console.log('accepting');
    socket.emit('accept', intervention._id);
  };
  const refuse = () => {
    console.log('refusing');
    socket.emit('refuse', intervention._id);
  };

  return (
    <BackImage source={require('../../assets/bg/bg1.png')}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Distance estimée : 10km (fake)</Text>
        <Text style={styles.text}>Sex du client : Homme (fake)</Text>
        <Text style={styles.text}>Age : 32 ans (fake)</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.refuse} onPress={refuse}>
            <Entypo name="cross" size={60} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accept} onPress={accept}>
            <Entypo name="check" size={60} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </BackImage>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  actionContainer: {
    height: '30%',
    maxHeight: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: 'yellow',
  },
  accept: {
    backgroundColor: '#5cb85c',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refuse: {
    backgroundColor: '#d9534f',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignSelf: 'center',
    top: 100,
  },
  text: {
    fontSize: 22,
    color: 'white',
    margin: 10,
  },
};

export default IntCheck;
