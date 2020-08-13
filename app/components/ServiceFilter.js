import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setServiceFilter, clearServiceFilter} from '../Store/actions';
import {Ionicons, Entypo} from '@expo/vector-icons';
import {BACKEND_URL} from 'react-native-dotenv';

export const ServiceFilter = (props) => {
  const {services, loading, error} = useSelector((state) => state.services);

  const [parents, setParents] = useState([null]);

  let toShow = services.filter((s) => s.parent === parents[parents.length - 1]);

  const onElementPress = (service) => {
    const children = services.filter((s) => s.parent === service._id);

    if (children.length > 0) {
      setParents([...parents, service._id]);
    } else {
      props.select(service);
    }
  };

  const back = () => {
    setParents(parents.slice(0, -1));
  };

  const clear = () => {
    props.clear();
  };

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        {parents.length > 1 && (
          <TouchableHighlight onPress={back} underlayColor="#fff">
            <View style={styles.backButton}>
              <Ionicons name="ios-arrow-back" size={30} color="black" />
              <Text style={styles.backText}>Retour</Text>
            </View>
          </TouchableHighlight>
        )}
        {props.nbSelected > 0 && (
          <TouchableHighlight onPress={clear} underlayColor="#fff">
            <View style={styles.clearBtn}>
              <Text style={styles.backText}>Services({props.nbSelected})</Text>
              <Entypo name="cross" size={30} color="red" />
            </View>
          </TouchableHighlight>
        )}
      </View>

      <View style={styles.viewServices}>
        {toShow.map((s) => (
          <TouchableHighlight
            underlayColor="#fff"
            key={s._id}
            onPress={() => onElementPress(s)}>
            <View
              style={
                props.selected(s._id) ? styles.selectedService : styles.service
              }>
              {s.image && s.image.length > 0 && (
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                  source={{
                    uri: BACKEND_URL + '/' + s.image,
                    cache: 'only-if-cached',
                  }}
                />
              )}
              <Text style={styles.serviceName}>{s.name}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  viewServices: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    paddingVertical: 10,
    // backgroundColor:'red'
  },
  service: {
    width: '100%',
    backgroundColor: '#efefef',
    borderRadius: 5,
    paddingVertical: 10,
    margin: 10,
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
    width: '100%',
    backgroundColor: '#4EC7E6',
    borderRadius: 5,
    paddingVertical: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  actions: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  clearBtn: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  backText: {
    fontSize: 20,
    paddingLeft: 5,
  },
  serviceName: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
