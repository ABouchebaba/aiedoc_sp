import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Socket, ageFromDate} from '../helpers';
import {initSocket} from '../Store/api';
import Entypo from 'react-native-vector-icons/Entypo';
import {BackImage, LoadingModal} from '../components';
import {BACKEND_URL} from 'react-native-dotenv';

const IntCheck = (props) => {
  const dispatch = useDispatch();
  const {intervention, client, loading} = useSelector((state) => state.current);

  const socket = Socket.getInstance();

  useEffect(() => {
    socket.init(BACKEND_URL, initSocket(dispatch, intervention._id));
  }, []);

  const accept = () => {
    socket.emit('accept', intervention._id);
  };
  const refuse = () => {
    socket.emit('refuse', intervention._id);
  };

  return (
    <BackImage source={require('../../assets/bg/bg1.png')}>
      <LoadingModal showModal={loading} text="synchronisation" />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Nom : {client.firstname} {client.lastname}
        </Text>
        <Text style={styles.text}>Age : {ageFromDate(client.birthdate)} </Text>
        <Text style={styles.text}>
          Distance estimée : {client.distance / 1000} km
        </Text>
        <Text style={styles.text}>Services recherchés :</Text>
        {intervention.services.map((s, i) => (
          <Text key={i} style={styles.text}>
            {'       '}
            {`\u2022 ${s}`}
          </Text>
        ))}
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
