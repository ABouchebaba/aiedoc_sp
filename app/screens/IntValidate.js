import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {unsetCurrent, setCurrent} from '../Store/actions';
import {Socket, AppStateEvents} from '../helpers';

const IntValidate = (props) => {
  const dispatch = useDispatch();
  const {intervention, loading} = useSelector((state) => state.current);
  const [services, setservices] = useState({massage: 5000, injection: 3000});

  let total_price = Object.values(services).reduce((p, c) => p + c);

  const socket = Socket.getInstance();
  socket.sync(intervention._id);

  const responses = {
    goReview: (intervention) => dispatch(setCurrent(intervention)),
  };
  socket.addEvents(responses);

  useEffect(() => {
    console.log('adding sync event');
    AppStateEvents.addNamedEvent('validate-sync', 'change', (nextAppState) => {
      if (nextAppState === 'active') {
        // trigger on foreground only
        console.log('sync event');
        socket.sync(intervention._id);
        socket.addEvents(responses);
      }
    });
    return () => {
      console.log('removing sync event validate');
      AppStateEvents.removeNamedEvent('validate-sync');
      // socket.destroy();
    };
  }, []);

  const validate = () => {
    socket.emit('validate', {
      int_id: intervention._id,
      services: Object.keys(services),
      total_price,
    });
  };

  return (
    <View>
      <View>
        {Object.keys(services).map((s) => (
          <Text key={s}>{s} </Text>
        ))}
      </View>
      <View>
        <Text>Total : {total_price}</Text>
      </View>
      <TouchableOpacity style={styles.action} onPress={validate}>
        <Text>Validate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  action: {
    backgroundColor: 'yellow',
    margin: 10,
    padding: 10,
  },
};

export default IntValidate;
