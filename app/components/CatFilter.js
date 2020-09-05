import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';
import {BACKEND_URL} from 'react-native-dotenv';

export const CatFilter = (props) => {
  const levels = props.levels;
  const parent = props.selectedParent?._id
  const [selected, setSelected] = useState('');
  const [parents, setParents] = useState([parent || null]);

  let toShow = levels.filter((s) => s.parent === parents[parents.length - 1]);

  const onElementPress = (service) => {
    const children = levels.filter((s) => s.parent === service._id);

    if (children.length > 0) {
      setParents([...parents, service._id]);
    } else {
      setSelected(service._id);
      props.selectOne(service);
    }
  };

  const back = () => {
    setParents(parents.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      {parents.length > 1  && (
        <TouchableHighlight onPress={back} underlayColor="#fff">
          <View style={styles.backButton}>
            <Ionicons name="ios-arrow-back" size={30} color="black" />
            <Text style={styles.backText}>Retour</Text>
          </View>
        </TouchableHighlight>
      )}
      <ScrollView
        style={{flex: 1, height: '60%', width: '100%'}}
        contentContainerStyle={styles.viewServices}>
        {toShow.map((s) => (
          <TouchableHighlight
            underlayColor="#fff"
            key={s._id}
            onPress={() => onElementPress(s)}>
            <View style={s._id === selected ? styles.service : styles.service}>
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
              <Text
                style={
                  parents.length > 1 ? styles.serviceName : styles.serviceName
                }>
                {s.name}
              </Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  viewServices: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 10,
    // backgroundColor:'red'
  },
  service: {
    width: '100%',
    backgroundColor: '#efefef',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
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
    padding: 10,
    alignSelf: 'center',
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
  backButton: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
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
  type: {
    width: '80%',
    backgroundColor: '#efefef',
    alignSelf: 'center',
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

  viewTypes: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  typeName: {
    fontSize: 22,
    textAlign: 'center',
  },
});
