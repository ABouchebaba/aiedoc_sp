import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getServices} from '../Store/actions';
import {initSocket} from '../Store/api';
import {Socket} from '../helpers';
import {BackImage, ServiceFilter} from '../components';
import {Ionicons, Entypo} from '@expo/vector-icons';
import {BACKEND_URL} from 'react-native-dotenv';

const IntValidate = (props) => {
  const dispatch = useDispatch();
  const {intervention, loading} = useSelector((state) => state.current);
  const {services} = useSelector((state) => state.services);
  const [selected, setSelected] = useState([]);

  let total_price = selected.reduce((p, c) => p + c.price, 0);

  const socket = Socket.getInstance();

  useEffect(() => {
    dispatch(getServices());
  }, []);

  useEffect(() => {
    /// initial setting of socket
    if (!socket.isInitialized()) {
      socket.init(BACKEND_URL, initSocket(dispatch, intervention._id));
    }
  }, []);

  const validate = () => {
    if (selected.length === 0) {
      return Alert.alert(
        'Liste vide',
        'Veuillez sélectionner au moins un service',
      );
    } else {
      socket.emit('validate', {
        int_id: intervention._id,
        services: selected.map((s) => s._id),
        total_price,
      });
    }
  };

  const addService = (s) => setSelected([...selected, s]);

  const removeService = (i) => {
    selected.splice(i, 1);
    setSelected([...selected]);
  };

  const clearServices = () => setSelected([]);

  const serviceSelected = (service) =>
    selected.find((s) => s._id === service._id);

  return (
    <BackImage source={require('../../assets/bg/bg1.png')}>
      <ScrollView style={{flex: 1}}>
        <Text style={styles.title}>Selectioner les services effectués : </Text>
        <View style={styles.toSelect}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <ServiceFilter
              select={addService}
              clear={clearServices}
              selected={serviceSelected}
              nbSelected={selected.length}
            />
          </ScrollView>
        </View>
        <View style={styles.selected}>
          <ScrollView contentContainerStyle={styles.scroll}>
            {selected.map((s, i) => (
              <TouchableOpacity
                key={s._id + i}
                onPress={() => removeService(i)}
                style={styles.element}>
                <Text style={{width: '80%'}}>
                  {s.name} - ({s.price} DA)
                </Text>
                <Entypo name="trash" size={20} color="red" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.price}>Total : {total_price} DA</Text>
          <TouchableOpacity onPress={validate} style={styles.validate}>
            <Text style={styles.validateText}>Valider</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BackImage>
  );
};

const styles = {
  title: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  toSelect: {
    alignSelf: 'center',
    height: 250,
    width: '95%',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  selected: {
    alignSelf: 'center',
    height: 220,
    width: '95%',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  scroll: {
    width: '100%',
    // backgroundColor: '#428bca',
    // flexDirection: 'co',
    // flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  element: {
    backgroundColor: '#dfdfdf',
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
    textAlign: 'center',
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'white',
  },
  validate: {
    alignSelf: 'center',
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#5cb85c',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  validateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
};

export default IntValidate;
