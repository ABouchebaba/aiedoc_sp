import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {unsetCurrent, setCurrent} from '../Store/actions';
import {Socket, AppStateEvents} from '../helpers';

const IntFinish = (props) => {
  const dispatch = useDispatch();
  const {intervention, loading} = useSelector((state) => state.current);
  const socket = Socket.getInstance();
  socket.sync(intervention._id);

  const responses = {
    goFacture: (intervention) => dispatch(setCurrent(intervention)),
  };
  socket.addEvents(responses);

  useEffect(() => {
    console.log('adding sync event');
    AppStateEvents.addNamedEvent('finish-sync', 'change', (nextAppState) => {
      if (nextAppState === 'active') {
        // trigger on foreground only
        console.log('sync event');
        socket.sync(intervention._id);
        socket.addEvents(responses);
      }
    });
    return () => {
      console.log('removing sync event finish');
      AppStateEvents.removeNamedEvent('finish-sync');
      // socket.destroy();
    };
  }, []);

  const finish = () => {
    console.log('finishing');
    console.log(socket.isInitialized());
    socket.emit('finish', intervention._id);
  };

  return (
    <View>
      <TouchableOpacity style={styles.action} onPress={finish}>
        <Text>Finish</Text>
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

export default IntFinish;
