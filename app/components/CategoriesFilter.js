import {FontAwesome, AntDesign} from '@expo/vector-icons';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Modal, Text} from 'react-native';
import {CatFilter} from './CatFilter';

export const CategoriesFilter = (props) => {
  const {service, modalOpen} = props.data;
  const levels = props.categories
  const [category, setCategory] = useState('');
  const [sorted, setSorted] = useState(false);
  const [sortedPrice, setSortedPrice] = useState(false);
  const [nameSelected, setNameSelected] = useState('');

  const selectOne = (value) => {
    closeModal();
    setNameSelected(value.name);
    props.setData({modalOpen: false, service: value});
    props.filter(value._id);
  };

  const clear = () => {
    closeModal();
    setNameSelected('');
    props.setData({modalOpen: false, service: null});
    props.filter('');
  };

  function sort() {
    props.sortAZ(!sorted);
    setSorted(!sorted);
  }

  function sortPrice() {
    props.sortPrice(!sortedPrice);
    setSortedPrice(!sortedPrice);
  }

  function closeModal() {
    props.setData({modalOpen: false});
  }

  function openFromInput() {
    props.setData({modalOpen: true});
  }

  return (
    <View style={styles.container}>
      <View style={{width: '75%'}}>
        <TouchableOpacity
          underlayColor={'#fff'}
          onPress={openFromInput}
          style={styles.rootSelect}>
          <View style={styles.input}>
            <Text style={{color: 'gray', margin: 3, fontSize: 15}}>
              {nameSelected.length > 0
                ? nameSelected
                : 'Sélectionner une catégorie'}
            </Text>
            {nameSelected.length > 0 && (
              <AntDesign name="close" size={24} color="black" onPress={clear} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '25%',
        }}>
        {!sorted ? (
          <TouchableOpacity style={styles.Icon} onPress={sort}>
            <FontAwesome name={'sort-alpha-asc'} size={26} color="#11A0C1" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{...styles.Icon, backgroundColor: '#05596C'}}
            onPress={sort}>
            <FontAwesome name={'sort-alpha-desc'} size={26} color="white" />
          </TouchableOpacity>
        )}
        {!sortedPrice ? (
          <TouchableOpacity style={styles.Icon} onPress={sortPrice}>
            <FontAwesome name={'sort-amount-asc'} size={26} color="gold" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{...styles.Icon, backgroundColor: 'gold'}}
            onPress={sortPrice}>
            <FontAwesome name={'sort-amount-desc'} size={26} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalOpen}
        onRequestClose={closeModal}>
        <View style={styles.modal}>
          <View style={styles.modalInside}>
            <Text style={styles.text}>Sélectionner une catégorie</Text>
            <CatFilter
              levels={levels}
              selectOne={selectOne}
              selectedParent={service}
            />
          </View>
          <AntDesign
            name="closecircle"
            size={50}
            color="#4EC7E6"
            onPress={closeModal}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scroll: {
    height: 70,
  },
  scrollContain: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 4,
  },
  filter: {
    borderRadius: 50,
    height: 35,
    width: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginRight: 10,
  },
  filterText: {
    color: '#4EC7E6',
    fontSize: 18,
  },
  Icon: {
    backgroundColor: 'white',
    padding: 5,
    // marginVertical: 10,
    borderRadius: 5,
    elevation: 5,
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
  rootSelect: {
    borderRadius: 5,
    elevation: 5,
    marginVertical: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
});
