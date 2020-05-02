import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getCommands} from '../Store/actions';
import {CommandModel} from './CommandModel';

export const Commands = () => {
  const dispatch = useDispatch();
  const {commands, loading} = useSelector((state) => state.history);
  const {_id} = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getCommands(_id));
    // console.log(commands);
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getCommands(_id));
    setRefreshing(false);
  }, [refreshing, command]);

  useFocusEffect(() => {});

  // const interventions = props.interventions
  const [command, setCommand] = useState({
    open: false,
    products: [],
  });

  function close() {
    setCommand({open: false, products: []});
  }

  function commandModel(products) {
    setCommand({open: true, products: products});
  }

  return loading ? (
    <View style={styles.scrollContain}>
      <ActivityIndicator size="large" color="#11A0C1" />
    </View>
  ) : (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {commands.map((cmd, i) => (
        <TouchableOpacity
          key={i}
          style={styles.card}
          onPress={() => commandModel(cmd.products)}>
          <View style={styles.leftSide}>
            <Entypo name="calendar" size={20} color="gray">
              <Text style={styles.text}> {cmd.createdAt.slice(0, 10)}</Text>
            </Entypo>
            <Entypo name="price-tag" size={20} color="#FFD700">
              <Text style={styles.text}> {cmd.total_price} DA</Text>
            </Entypo>
            <AntDesign name="CodeSandbox" size={20} color="green">
              {cmd.products.length > 1 ? (
                <Text style={styles.text}> {cmd.products.length}produits</Text>
              ) : (
                <Text style={styles.text}> {cmd.products.length} produit</Text>
              )}
            </AntDesign>
          </View>
          <View style={styles.rightSide}>
            {/* <Text style={styles.text}>Etat</Text> */}

            {cmd.status === 'pending' ? (
              <>
                <FontAwesome name="refresh" size={30} color="#FFD700" />
                <Text style={styles.pending}>En cours de livraison</Text>
              </>
            ) : cmd.status === 'done' ? (
              <>
                <Feather name="check-circle" size={30} color="green" />
                <Text style={styles.done}>Livré</Text>
              </>
            ) : (
              <Entypo name="star" size={20} color="#FFD700">
                {cmd.status}
              </Entypo>
            )}
          </View>
        </TouchableOpacity>
      ))}
      <CommandModel
        close={close}
        showModel={command.open}
        products={command.products}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#cadce6',
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
  pending: {
    color: 'orange',
    fontSize: 18,
  },
  done: {
    color: 'green',
    fontSize: 18,
  },
  scrollContain: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 4,
    backgroundColor: '#cadce6',
  },
});
