import Entypo from 'react-native-vector-icons/Entypo';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import {useDispatch, useSelector} from 'react-redux';
import {BackImage} from '../components';
import {getServices} from '../Store/actions';

const Services = (props) => {
  const dispatch = useDispatch();
  let services = useSelector((state) => state.services.services);

  const [userService, setUserServices] = useState([]);
  const fruits = ['Apples', 'Oranges', 'Pears'];

  function submitServices() {
    console.log(userService);
  }

  useEffect(() => {
    dispatch(getServices());
  }, []);

  return (
    <BackImage source={require('../../assets/bg/bgHome.png')}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={props.navigation.openDrawer}>
            <Entypo name="menu" size={60} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.mainView}>
          {/* <ScrollView style={styles.scroll}>
            {services.map((x, i) => (
              <ServiceCard key={i} type={x}/>
            ))}
          </ScrollView> */}
          <Text style={{...styles.text, textAlign: 'center'}}>
            Selectionez vos services
          </Text>
          <SelectMultiple
            style={{padding: 10}}
            labelStyle={styles.text}
            selectedLabelStyle={{color: 'blue'}}
            rowStyle={{backgroundColor: 'rgba(255,255,255,0)'}}
            checkboxStyle={{borderColor: '#4EC7E6'}}
            items={services}
            selectedItems={userService}
            onSelectionsChange={(value) => setUserServices(value)}
          />

          <View style={styles.bottom}>
            {userService.length !== 0 && (
              <TouchableOpacity
                onPress={submitServices}
                style={{
                  backgroundColor: '#38B4DD',
                  borderRadius: 50,
                  padding: 5,
                }}>
                <Entypo name="check" color="white" size={40} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </BackImage>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
  },
  header: {
    height: '10%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  mainView: {
    height: '80%',
    width: '100%',
    borderRadius: 30,
    backgroundColor: '#D5F0F8',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  text: {
    color: '#666666',
    fontSize: 20,
  },
  scroll: {
    paddingHorizontal: 15,
  },
  bottom: {
    height: '15%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "red",
  },
});

export default Services;
