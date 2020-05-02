import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const Purchaces = (props) => {
  //const purchaces = props.purchaces
  const purchaces = [
    {
      _id: '5e655fad2e011c00165eeb06',
      totalPrice: 0,
      intervention_id: '5e655fad2e011c00165eeb05',
      date: '2020-03-08T21:12:13.409Z',
      sp_name: 'service provider',
      rating: 4,
    },
    {
      _id: '5e655fad2e011c00165eeb06',
      totalPrice: 0,
      intervention_id: '5e655fad2e011c00165eeb05',
      date: '2020-03-08T21:12:13.409Z',
      sp_name: 'service provider',
      rating: 1,
    },
  ];

  return (
    <ScrollView style={styles.scrollView}>
      {purchaces.map((prc, i) => (
        <TouchableOpacity
          key={i}
          style={styles.card}
          onPress={() => alert('it should show intervention model')}>
          <View style={styles.leftSide}>
            <Entypo name="calendar" size={20} color="gray">
              <Text style={styles.text}> {prc.date.slice(0, 10)}</Text>
            </Entypo>
            <Entypo name="price-tag" size={20} color="#FFD700">
              <Text style={styles.text}> {prc.totalPrice} DA</Text>
            </Entypo>
            <FontAwesome name="user-md" size={20} color="green">
              <Text style={styles.text}> {prc.sp_name}</Text>
            </FontAwesome>
          </View>
          <View style={styles.rightSide}>
            <Text style={styles.text}>Rating</Text>
            <View style={styles.ratingView}>
              {[...Array(prc.rating)].map((x, i) => (
                <Entypo key={i} name="star" size={30} color="#FFD700"></Entypo>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#b8c8d1',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  card: {
    height: 120,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 15,
    // shadow style
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  leftSide: {
    justifyContent: 'space-around',
    flex: 1,
    width: '50%',
  },
  rightSide: {
    width: '50%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingView: {
    flexDirection: 'row',
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
});
