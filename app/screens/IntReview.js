import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Socket, AppStateEvents} from '../helpers';
import {unsetCurrent, resetCurrentIntervention} from '../Store/actions';
import {LoadingModal, BackImage} from '../components';

const IntReview = (props) => {
  const dispatch = useDispatch();
  const {intervention, loading} = useSelector((state) => state.current);
  const [review, setreview] = useState({comment: 'Nice', rating: 4});

  const socket = Socket.getInstance();
  socket.sync(intervention._id);

  const responses = {
    goHome: () => {
      // alert("Intervention successfully finished");
      // AppStateEvents.removeNamedEvent('sync');
      socket.destroy();
      dispatch(unsetCurrent());
    },
  };
  socket.addEvents(responses);

  useEffect(() => {
    console.log('adding sync event');
    AppStateEvents.addNamedEvent('review-sync', 'change', (nextAppState) => {
      if (nextAppState === 'active') {
        // trigger on foreground only
        console.log('sync event');
        socket.sync(intervention._id);
        socket.addEvents(responses);
      }
    });
    return () => {
      console.log('removing sync event review');
      AppStateEvents.removeNamedEvent('review-sync');
      // socket.destroy();
    };
  }, []);

  const confirm = () => {
    socket.emit('spReview', {
      int_id: intervention._id,
      ...review,
    });
  };

  return (
    <View>
      <Text>Review</Text>
      <TouchableOpacity onPress={confirm}>
        <Text>Review</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IntReview;
