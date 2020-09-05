import {AntDesign} from '@expo/vector-icons';
import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CatFilter} from './CatFilter';

export const CategoriesFilterInput = (props) => {
  
  const [selected, setSelected] = useState('');

  const selectOne = (value) => {
    props.setIsOpen(false);
    setSelected(value.name);
    props.selected(value._id);
  };

  const clear = () => {
    props.setIsOpen(false);
    setSelected('');
    props.selected('');
  };

  return (
    <View>
      <TouchableOpacity
        underlayColor={'#fff'}
        onPress={() => props.setIsOpen(true)}
        style={styles.rootSelect}>
        <View style={styles.input}>
          <Text style={{color: 'gray', margin: 3, fontSize: 15}}>
            {selected.length > 0 ? selected : 'Sélectionner une catégorie'}
          </Text>
          {selected.length > 0 && (
            <AntDesign name="close" size={24} color="black" onPress={clear} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  optionTextWrapper: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  rootSelect: {
    borderRadius: 5,
    elevation: 5,
    marginVertical: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba( 250, 250, 250, 0.8 )',
  },
  modalInside: {
    borderColor: '#4EC7E6',
    borderWidth: 4,
    backgroundColor: 'white',
    width: '90%',
    height: '60%',
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 5,
    marginBottom: 15,
  },
  text: {
    fontSize: 20,
    paddingVertical: 15,
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
});
