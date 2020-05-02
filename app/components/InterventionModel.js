import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import React from 'react';
import {Image, Modal, StyleSheet, Text, View, ScrollView} from 'react-native';

export const InterventionModel = (props) => {
  // const services = props.services
  const services = [
    {
      service: 'injection',
      prix: 200,
    },
    {
      service: 'massage',
      prix: 300,
    },
  ];
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModel}
      onRequestClose={props.close}>
      <View style={styles.modelCard}>
        <View style={styles.modelInfo}>
          <Text style={styles.modelText}>
            Liste des services ({services.length})
          </Text>
          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listStyle}>
            <View style={styles.prd}>
              <Text style={styles.prdTitle}>Service: </Text>
              <Text style={styles.prdTitle}>Prix: </Text>
            </View>
            {services.map((srv, index) => (
              <View key={index} style={styles.prd}>
                <Text style={styles.prdText}>{srv.service}</Text>
                <Text style={styles.total}>{srv.prix}</Text>
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
    paddingVertical: 10,
    backgroundColor: 'white',
    // alignItems: "center",
    borderTopWidth: 1,
    borderColor: '#707070',
    justifyContent: 'flex-start',
  },
  prd: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  prdText: {
    width: '80%',
    color: '#11A0C1',
    fontSize: 16,
    textAlign: 'left',
  },
  total: {
    textAlign: 'right',
    color: '#11A0C1',
    fontSize: 16,
  },
  prdTitle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    backgroundColor: '#11A0C1',
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});
