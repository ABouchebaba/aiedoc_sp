import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getServices} from '../Store/actions';
import {initSocket} from '../Store/api';
import {getAllServices} from '../Store/selectors';
import {Socket} from '../helpers';
import {BackImage} from '../components';
import {BACKEND_URL} from 'react-native-dotenv';

const IntValidate = (props) => {
  const dispatch = useDispatch();
  const {intervention, loading} = useSelector((state) => state.current);
  const services = useSelector(getAllServices);
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
    socket.emit('validate', {
      int_id: intervention._id,
      services: selected.map((s) => s.name),
      total_price,
    });
  };

  const addService = (s) => setSelected([...selected, s]);

  const removeService = (i) => {
    selected.splice(i, 1);
    setSelected([...selected]);
  };

  return (
    <BackImage source={require('../../assets/bg/bg1.png')}>
      <Text style={styles.title}>Selectioner les services effectués : </Text>
      <View style={styles.toSelect}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {services.map((s, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => addService(s)}
              style={styles.element}>
              <Text>
                {s.name} - ({s.price} DA)
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.selected}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {selected.map((s, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => removeService(i)}
              style={styles.element}>
              <Text>
                {s.name} - ({s.price} DA)
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.price}>Total : {total_price} DA</Text>

      <TouchableOpacity onPress={validate} style={styles.validate}>
        <Text style={styles.validateText}>Valider</Text>
      </TouchableOpacity>
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
    height: '40%',
    width: '95%',
    borderRadius: 20,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#428bca',
  },
  selected: {
    alignSelf: 'center',
    height: '25%',
    width: '95%',
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#428bca',
  },
  scroll: {
    width: '100%',
    // backgroundColor: '#428bca',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  element: {
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    // width: '45%',
    borderRadius: 5,
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
