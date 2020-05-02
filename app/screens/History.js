import Entypo from 'react-native-vector-icons/Entypo';

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BackImage, Interventions} from '../components';

// const initialLayout = { width: Dimensions.get('window').width };

const History = (props) => {
  return (
    <BackImage source={require('../../assets/bg/bgHome.png')}>
      <View style={styles.header}>
        <TouchableOpacity onPress={props.navigation.openDrawer}>
          <Entypo name="menu" size={60} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.mainView}>
        <View style={styles.head}>
          <Text style={styles.text}>MES PRESTATIONS</Text>
        </View>
        <Interventions />
      </View>
    </BackImage>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  header: {
    height: '15%',
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  mainView: {
    height: '85%',
    width: '100%',
  },
  tabView: {
    backgroundColor: 'white',
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
  },
  scene: {
    flex: 1,
  },
  modelCard: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba( 250, 250, 250, 0.5 )',
  },
  modelInfo: {
    backgroundColor: '#4EC7E6',
    width: '70%',
    height: '50%',
    justifyContent: 'space-evenly',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: 'auto',
    height: 70,
    resizeMode: 'contain',
  },
  modelText: {
    alignSelf: 'center',
    fontSize: 20,
  },
  head: {
    backgroundColor: 'white',
    height: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#11A0C1',
  },
});

export default History;
