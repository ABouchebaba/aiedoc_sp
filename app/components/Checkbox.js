import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const checkedIcon = <MaterialIcons name="check-box" color="white" size={20} />;
const uncheckedIcon = (
  <MaterialIcons name="check-box-outline-blank" color="grey" size={20} />
);

export const Checkbox = (props) => {
  const container = props.selected
    ? styles.containerSelected
    : styles.containerUnselected;
  const Icon = props.selected ? checkedIcon : uncheckedIcon;
  const text = props.selected ? styles.textSelected : styles.textUnselected;
  return (
    <TouchableOpacity
      style={[styles.container, container]}
      onPress={props.onPress}>
      {Icon}
      <Text style={text}> {props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = {
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
};
