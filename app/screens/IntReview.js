import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Socket} from '../helpers';
import {initSocket} from '../Store/api';
import {BackImage} from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BACKEND_URL} from 'react-native-dotenv';

const IntReview = (props) => {
  const dispatch = useDispatch();
  const {intervention, loading} = useSelector((state) => state.current);
  const [review, setreview] = useState({comment: '', rating: 0});
  let ref = useRef(null);

  const socket = Socket.getInstance();

  useEffect(() => {
    /// initial setting of socket
    if (!socket.isInitialized()) {
      socket.init(BACKEND_URL, initSocket(dispatch, intervention._id));
    }
  }, []);

  const confirm = () => {
    socket.emit('spReview', {
      int_id: intervention._id,
      ...review,
    });
  };

  return (
    <BackImage source={require('../../assets/bg/bg1.png')}>
      <View style={styles.container}>
        <Text style={styles.primaryText}>Note: </Text>
        <View style={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <AntDesign
              key={i}
              name="star"
              size={30}
              color={i >= review.rating ? 'white' : '#f0ad4e'}
              onPress={() => setreview({...review, rating: i + 1})}
            />
          ))}
        </View>

        <Text style={styles.primaryText}>Commentaire:</Text>

        <TouchableWithoutFeedback onPress={() => ref.focus()}>
          <View style={styles.textAreaWrapper}>
            <TextInput
              ref={(r) => (ref = r)}
              style={styles.textArea}
              editable
              multiline
              onChangeText={(comment) => setreview({...review, comment})}
            />
          </View>
        </TouchableWithoutFeedback>

        <TouchableOpacity onPress={confirm} style={styles.action}>
          <Text style={styles.actionText}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </BackImage>
  );
};

const styles = {
  container: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  textArea: {
    backgroundColor: 'white',
    width: '100%',
    // minWidth: 300,
    maxWidth: 250,
    // padding: 20,
  },
  textAreaWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 300,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
  },
  action: {
    borderRadius: 20,
    padding: 15,
    margin: 15,
    backgroundColor: '#5cb85c',
    borderWidth: 1,
    borderColor: 'white',
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 50,
  },
};

export default IntReview;
