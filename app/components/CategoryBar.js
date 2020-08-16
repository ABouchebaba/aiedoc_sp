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
  const categories = props.categories
    .filter((s) => s.level === 'SubSubFamily')
    .slice(0, 10);
  const [selected, setSelected] = useState('');

  function select(value) {
    const toSelect = value._id === selected ? '' : value._id;
    setSelected(toSelect);
    props.filter(toSelect);
  }

  return (
    <ScrollView
      horizontal
      style={styles.container}
      contentContainerStyle={styles.scrollView}>
      {categories.map((s) => {
        console.log("url: ",s)
        return (
          <TouchableOpacity
            key={s._id}
            onPress={() => select(s)}
            style={
              s._id === selected ? styles.selectedService : styles.service
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
    padding: 10,
    marginHorizontal: 10,
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
