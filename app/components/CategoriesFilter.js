import {FontAwesome} from '@expo/vector-icons';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {CategoriesFilterInput} from './CategoriesFilterInput';

export const CategoriesFilter = (props) => {
  const [category, setCategory] = useState('');
  const [sorted, setSorted] = useState(false);
  const [sortedPrice, setSortedPrice] = useState(false);

  function sort() {
    props.sortAZ(!sorted);
    setSorted(!sorted);
  }

  function sortPrice() {
    props.sortPrice(!sortedPrice);
    setSortedPrice(!sortedPrice);
  }

  function filter(value) {
    console.log('testing : ', value);
    setCategory(value);
    props.filter(value);
  }

  return (
    <View style={styles.container}>
      <View style={{width: '75%'}}>
        <CategoriesFilterInput
          selected={filter}
          categories={props.categories}
        />
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
});
