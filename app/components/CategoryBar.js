import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {BACKEND_URL} from 'react-native-dotenv';

export const CategoryBar = (props) => {
  // const {service, modalOpen} = props.selected
  const categories = props.categories.filter((s) => s.level === 'Family');

  function select(value) {
    // const toSelect = value._id === service._id ? {} : value;
    // const toSelect = value;
    props.filter({service: value, modalOpen: true});
  }

  return (
    <ScrollView
      horizontal
      style={styles.container}
      contentContainerStyle={styles.scrollView}>
      {categories.map((s) => {
        return (
          <TouchableOpacity
            key={s._id}
            onPress={() => select(s)}
            style={styles.service
              // s._id === service._id ? styles.selectedService : styles.service
            }>
            {s.image && s.image.length > 0 ? (
              <Image
                style={{
                  width: '100%',
                  height: '90%',
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
                source={{
                  uri: BACKEND_URL + '/' + s.image,
                  cache: 'only-if-cached',
                }}
              />
            ) : (
              <Image
                style={{
                  width: '100%',
                  height: '90%',
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
                source={require('../../assets/boutique.png')}
              />
            )}
            <Text style={styles.serviceName}>{s.name}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  service: {
    backgroundColor: '#fff',
    borderRadius: 3,
    margin: 5,
    padding: 5,
    // marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  selectedService: {
    // width: '100%',
    backgroundColor: '#4EC7E6',
    borderRadius: 3,
    margin: 5,
    padding: 5,
    // marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  serviceName: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  scrollView: {
    alignItems: 'center',
    paddingVertical: 8,
  },
});
