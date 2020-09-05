import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const checkedIcon = <MaterialIcons name="check-box" color="white" size={20} />;
const uncheckedIcon = (
  <MaterialIcons name="check-box-outline-blank" color="grey" size={20} />
);

export const ServiceCard = (props) => {
  const type = props.type;

  return (
    <View style={styles.typeView}>
      <Text style={styles.typeTitle}>{type.type}</Text>
      <ScrollView horizontal={true} contentContainerStyle={styles.innerContent}>
        {type.services.map((x, i) => (
          <TouchableOpacity
            key={i}
            style={styles.container}
            onPress={props.onPress}>
            <MaterialIcons name="check-box" color="white" size={20} />
            <Text style={styles.textSelected}>{x.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  typeView: {
    // backgroundColor:'green',
    borderBottomWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  typeTitle: {
    fontSize: 25,
    color: 'white',
    backgroundColor: '#38B4DD',
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 15,
  },
  innerContent: {
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container: {
    borderRadius: 5,
    width: '40%',
    maxWidth: 150,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
  },
  containerSelected: {
    backgroundColor: '#8edbef',
  },
  containerUnselected: {
    backgroundColor: 'white',
  },
  textSelected: {
    color: 'white',
  },
  textUnselected: {
    color: 'grey',
  },
});
