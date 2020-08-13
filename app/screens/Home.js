import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BackImage, Header, Switch, LoadingModal} from '../components';
import {setOnlineState, getServices} from '../Store/actions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {height} = Dimensions.get('window');

const powerOnColor = 'red';
const powerOffColor = '#616161';
const colors = [powerOffColor, powerOnColor];

const Home = (props) => {
  const dispatch = useDispatch();
  const {user, loading} = useSelector((state) => state.user);
  const {services} = useSelector((state) => state.services);
  const powerColor = user.state !== 'notReady' ? colors : colors.reverse();

  useEffect(() => {
    if (services.length === 0) dispatch(getServices());
  }, []);

  const toggleOnline = () => {
    if (user.state !== 'notReady') {
      dispatch(setOnlineState(user._id, 'notReady'));
    } else {
      dispatch(setOnlineState(user._id, 'ready'));
    }
  };

  const enableEmergency = () => {
    dispatch(setOnlineState(user._id, 'emergencyReady'));
  };
  const disableEmergency = () => {
    dispatch(setOnlineState(user._id, 'ready'));
  };

  return (
    <BackImage source={require('../../assets/bg/bgHome.png')}>
      <LoadingModal showModal={loading} text="Mise à jour du statut" />
      <Header />
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.label}>Votre solde</Text>
          <Text style={styles.balanceText}>{user.balance} DA</Text>
        </View>
        <TouchableOpacity
          onPress={toggleOnline}
          // style={[styles.power, { backgroundColor: powerColor[0] }]}
          style={user.state !== 'notReady' ? styles.powerOn : styles.powerOff}>
          <Ionicons
            name="ios-power"
            size={55}
            color={user.state !== 'notReady' ? 'red' : '#616161'}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'white'}}>
          {user.state !== 'notReady' ? 'VOUS ETES EN SERVICE' : ''}
        </Text>
        <Switch
          loading={loading}
          state={user.state}
          enable={enableEmergency}
          disable={disableEmergency}
        />
      </View>
    </BackImage>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 0.6 * height,
    maxHeight: 500,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: 'white',
    fontSize: 18,
  },
  balanceText: {
    // left: -15,
    backgroundColor: 'white',
    color: 'red',
    maxWidth: 250,
    minWidth: 150,
    padding: 15,
    marginTop: 10,
    borderRadius: 50,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  power: {
    borderWidth: 1,
    borderColor: '#efefef',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergency: {
    backgroundColor: 'red',
    width: 100,
    height: 50,
    borderRadius: 20,
    overflow: 'hidden',
  },
  powerOn: {
    borderWidth: 2,
    borderColor: '#C62828',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#C62828',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  powerOff: {
    borderWidth: 2,
    borderColor: '#BDBDBD',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9E9E9E',
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default Home;
