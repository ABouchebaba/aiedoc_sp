import {Entypo} from '@expo/vector-icons';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BACKEND_URL} from 'react-native-dotenv';
import FastImage from 'react-native-fast-image';

export const ProductCard = (props) => {
  const product = props.product;
  // console.log(product.images[0])
  // console.log(BACKEND_URL)
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.6}
      onPress={() => props.navigation.navigate('ProductProfile', {product})}>
      <View style={styles.imageSide}>
        {product.images.length > 0 ? (
          <FastImage
            style={{width: 100, height: 100}}
            source={{
              uri: BACKEND_URL + '/' + product.images[0],
              priority: FastImage.priority.normal,
            }}
            // resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          <Image
            source={{
              uri: '../../assets/product.jpg',
            }}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.leftSide}>
        <Text style={styles.name}>
          {product.name.length > 35
            ? product.name.slice(0, 35).replace(/(\r\n|\n|\r)/gm, '') + '...'
            : product.name.replace(/(\r\n|\n|\r)/gm, '')}
        </Text>
        <Text style={styles.brand}>
          Marque: {product.brand.replace(/(\r\n|\n|\r)/gm, '')}
        </Text>
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
    height: 230,
    backgroundColor: 'white',
    width: '46%',
    borderWidth: 1,
    borderColor: 'white',
    // borderRadius:10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  imageSide: {
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // marginTop: 10,
    // width: "100%",
    // height: "100%",
    // resizeMode: "contain",
    // borderWidth:1,
    width: 100,
    height: 100,
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
    /* color: '#11A0C1', */
    fontSize: 13,
  },
  brand: {
    /* color: '#11A0C1', */
    fontSize: 11,
    fontStyle: 'italic',
  },
  price: {
    color: '#D61F2C',
    fontSize: 15,
    fontWeight: 'bold',
  },
  priceOld: {
    color: 'gray',
    fontSize: 13,
    fontWeight: 'bold',
    // fontStyle: "normal",
    textDecorationLine: 'line-through',
    textDecorationColor: 'red',
    textDecorationStyle: 'dotted',
  },
  priceDiscount: {
    color: '#D61F2C',
    fontSize: 15,
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
