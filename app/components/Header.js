import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {useNavigation} from '@react-navigation/native';

export const Header = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.openDrawer}>
        <Entypo name="menu" size={60} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Boutique')}>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/boutique.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tinyLogo: {
    width: 60,
    height: 60,
  },
});
