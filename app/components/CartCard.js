import {MaterialIcons, Entypo} from '@expo/vector-icons';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';

export const CartCard = (props) => {
  const product = props.product;
  const isRent = product.from !== null && product.to !== null;

  const diff = isRent ? new Date(product.to) - new Date(product.from) : 0;

  function deleteProduct() {
    Alert.alert(
      'Retirer du panier',
      `Êtes-vous sûr de vouloir supprimer ${product.product_name} ${product.option}`,
      [
        {
          text: 'ANNULER',
          style: 'cancel',
        },
        {
          text: 'RETIRER',
          onPress: () => props.remove(props.index, product.option),
        },
      ],
      {cancelable: false},
    );
  }

  function minus() {
    if (product.qty > 1) props.minus(product.product_id, product.option);
  }

  function plus() {
    props.plus(product.product_id, product.option);
  }

  return (
    <View style={styles.card}>
      <View style={styles.upView}>
        <Text style={styles.name}>
          {product.product_name.replace(/(\r\n|\n|\r)/gm, '')}
        </Text>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.brand}>
          option: {product.option.trim() !== '' ? product.option : 'Standard'}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.price}>{Math.floor(product.price)} DA </Text>
          {isRent && (
            <Text style={styles.fullPrice}>
              {diff / (1000 * 60 * 60 * 24)} jours{' '}
            </Text>
          )}
          <Text style={styles.fullPrice}>
            {isRent
              ? Math.floor(product.price * product.qty * diff) /
                (1000 * 60 * 60 * 24)
              : Math.floor(product.price * product.qty)}{' '}
            DA
          </Text>
        </View>
      </View>
      <View style={styles.downView}>
        <TouchableOpacity onPress={deleteProduct}>
          <MaterialIcons name="delete" color="red" size={30} />
        </TouchableOpacity>
        {!isRent && (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={minus}>
              <Entypo
                name="circle-with-minus"
                color="rgba(214,31,44,.6)"
                size={25}
              />
            </TouchableOpacity>
            <Text style={styles.qty}>{product.qty}</Text>
            <TouchableOpacity onPress={plus}>
              <Entypo name="circle-with-plus" color="#11A0C1" size={25} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 150,
    backgroundColor: 'white',
    width: '95%',
    borderWidth: 1,
    borderColor: 'white',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  upView: {
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: '#0F8AA7',
  },
  qty: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 3,
  },
  downView: {
    marginTop: 10,
    paddingHorizontal: 20,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  name: {
    color: '#11A0C1',
    fontSize: 15,
  },
  brand: {
    color: '#11A0C1',
    fontSize: 13,
  },
  price: {
    color: '#D61F2C',
    fontSize: 13,
  },
  fullPrice: {
    color: '#D61F2C',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
