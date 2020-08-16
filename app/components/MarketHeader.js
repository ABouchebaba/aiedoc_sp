import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

export const MarketHeader = (props) => {
  const {cart} = useSelector((state) => state.cart);
  const navigation = useNavigation();

  return (
    <View style={styles.image}>
      <TouchableOpacity onPress={navigation.openDrawer}>
        <Entypo name="menu" size={50} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('StoreHome')}>
        {/* <Image
          style={styles.tinyLogo}
          source={require('../../assets/boutique.png')}
        /> */}
        <FastImage
          style={{width: 50, height: 50}}
          source={require('../../assets/boutique.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        {cart.length === 0 ? (
          <Image
            style={{width: 45, height: 45, resizeMode: 'contain'}}
            source={require('../../assets/empty_cart.png')}
          />
        ) : (
          <>
            <Text style={styles.text}>{cart.length}</Text>
            <Image
              style={{width: 40, height: 40, resizeMode: 'contain'}}
              source={require('../../assets/fill_cart.png')}
            />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
    width: '90%',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  logo: {
    width: 40,
    height: 40,
  },
  text: {
    color: 'white',
    backgroundColor: 'red',
    textAlign: 'center',
    width: 20,
    height: 20,
    borderRadius: 50,
    fontWeight: 'bold',
  },
});
