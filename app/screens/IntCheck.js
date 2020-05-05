import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Socket, AppStateEvents} from '../helpers';
import {unsetCurrent, setCurrent} from '../Store/actions';

const IntCheck = (props) => {
  const dispatch = useDispatch();
  const {intervention, loading} = useSelector((state) => state.current);
  const socket = Socket.getInstance();
  socket.sync(intervention._id);

  const responses = {
    refused: (int_id) => dispatch(unsetCurrent()),
    goWait: (intervention) => dispatch(setCurrent(intervention)),
  };
  socket.addEvents(responses);

  useEffect(() => {
    console.log('adding sync event');
    AppStateEvents.addNamedEvent('check-sync', 'change', (nextAppState) => {
      if (nextAppState === 'active') {
        // trigger on foreground only
        console.log('sync event');
        socket.sync(intervention._id);
        socket.addEvents(responses);
      }
    });
    return () => {
      console.log('removing sync event : check');
      AppStateEvents.removeNamedEvent('check-sync');
      // socket.destroy();
    };
  }, []);

  const accept = () => {
    console.log('accepting');
    socket.emit('accept', intervention._id);
  };
  const refuse = () => {
    console.log('refusing');
    socket.emit('refuse', intervention._id);
  };

  return (
    <View>
      <TouchableOpacity style={styles.action} onPress={accept}>
        <Text>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action} onPress={refuse}>
        <Text>refuse</Text>
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

export default IntCheck;
