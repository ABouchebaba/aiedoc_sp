import Entypo from 'react-native-vector-icons/Entypo';

import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const ProductCard = (props) => {
  const product = props.product;
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.6}
      onPress={() => props.navigation.navigate('ProductProfile', {product})}>
      <View style={styles.imageSide}>
        <Image
          source={require('../../assets/product.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.leftSide}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.brand}>Marque: {product.brand}</Text>
        <View style={styles.ratingView}>
          {[...Array(5)].map((x, i) =>
            product.rating > i ? (
              <Entypo key={i} name="star" size={15} color="#D61F2C" />
            ) : (
              <Entypo key={i} name="star" size={15} color="#E7AAAE" />
            ),
          )}
        </View>
        {product.discount === 0 ? (
          <Text style={styles.price}>{product.price} DA</Text>
        ) : (
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={styles.priceOld}>{product.price} DA</Text>
            <Text style={styles.priceDiscount}>
              {product.price - product.price * (product.discount / 100)} DA
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 220,
    backgroundColor: 'white',
    width: '46%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  imageSide: {
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 10,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderWidth: 1,
  },
  leftSide: {
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
  ratingView: {
    flexDirection: 'row',
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
  name: {
    color: '#11A0C1',
    fontSize: 16,
  },
  brand: {
    color: '#11A0C1',
    fontSize: 14,
    fontStyle: 'italic',
  },
  price: {
    color: '#D61F2C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceOld: {
    color: 'gray',
    fontSize: 15,
    fontWeight: 'bold',
    // fontStyle: "normal",
    textDecorationLine: 'line-through',
    textDecorationColor: 'red',
    textDecorationStyle: 'dotted',
  },
  priceDiscount: {
    color: '#D61F2C',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
    textDecorationStyle: 'dotted',
  },
  category: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
