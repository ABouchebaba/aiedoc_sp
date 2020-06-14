import {FontAwesome, Entypo} from '@expo/vector-icons';
import React from 'react';
import {Image, Modal, StyleSheet, Text, View, Animated} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export const CommandModel = (props) => {
  // const intervention = props.intervention
  console.log(props.products);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModel}
      onRequestClose={props.close}>
      <View style={styles.modelCard}>
        <View style={styles.modelInfo}>
          <Text style={styles.modelText}>
            Liste des produits ({props.products.length})
          </Text>
          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listStyle}>
            {props.products.map((prd, index) => (
              <View key={index} style={styles.prd}>
                <Text style={styles.prdTitle}>{prd.product.name.trim()}</Text>
                <Text style={styles.prdText}>
                  Option: {prd.option.length == 0 ? 'Standard' : prd.option}
                </Text>
                <Text style={styles.prdText}>Prix: {prd.product.price} </Text>
                <Text style={styles.prdText}>Quantité: {prd.qty}</Text>
                <Text style={styles.total}>
                  TOTAL:{prd.qty * prd.product.price}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <Entypo
          name="cross"
          size={60}
          color="white"
          style={styles.icon}
          onPress={props.close}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modelCard: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba( 250, 250, 250, 0.5 )',
  },
  modelInfo: {
    backgroundColor: '#4EC7E6',
    width: '80%',
    height: '70%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  modelText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
  },
  icon: {
    backgroundColor: 'red',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  list: {
    flex: 1,
    height: '50%',
    width: '100%',
    paddingVertical: 10,
    // marginTop:10
  },
  listStyle: {
    // paddingVertical:10,
    backgroundColor: 'white',
    // alignItems: "center",
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#21b9e0',
    justifyContent: 'flex-start',
  },
  prd: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#4EC7E6',
  },
  prdText: {
    // alignSelf: "center",
    color: '#11A0C1',
    fontSize: 16,
  },
  total: {
    textAlign: 'right',
    color: '#11A0C1',
    fontSize: 16,
  },
  prdTitle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    backgroundColor: '#11A0C1',
    paddingHorizontal: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
});
