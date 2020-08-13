import React, {useEffect} from 'react';
import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';

export const InterventionModel = (props) => {
  const {types} = useSelector((state) => state.services);

  const Allservices = types.reduce((p, c) => [...p, ...c.services], []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModel}
      onRequestClose={props.close}>
      <View style={styles.modelCard}>
        <View style={styles.modelInfo}>
          <Text style={styles.modelText}>
            Liste des services ({props.services.length})
          </Text>
          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listStyle}>
            <View style={styles.prd}>
              <Text style={styles.prdTitle}>Service: </Text>
              <Text style={{width: '50%'}}></Text>
              <Text style={styles.prdTitle}>Prix: </Text>
            </View>
            {Allservices.map(
              (srv, index) =>
                props.services.includes(srv.name) && (
                  <View key={index} style={styles.prd}>
                    <Text style={styles.prdText}>{srv.name}</Text>
                    <Text style={styles.total}>{srv.price}</Text>
                  </View>
                ),
            )}
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
    // paddingVertical: 10,
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
    borderBottomWidth: 3,
    borderColor: '#4EC7E6',
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
    // alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    backgroundColor: '#11A0C1',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
