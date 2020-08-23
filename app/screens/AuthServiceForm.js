import Entypo from 'react-native-vector-icons/Entypo';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import {useDispatch, useSelector} from 'react-redux';
import {BackImage, ServiceFilter} from '../components';
import {getServices, register, setUser} from '../Store/actions';

const AuthServiceForm = (props) => {
  const infos = props.route.params;
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.services);
  const [selectedServices, setSelectedServices] = useState([]);

  async function submitServices() {
    const data = {...infos, services: selectedServices.map((s) => s._id)};
    props.navigation.navigate('AuthTermsAndConditions', data);
  }

  useEffect(() => {
    dispatch(getServices());
  }, []);

  const selectService = (service) => {
    const services = selectedServices.filter((s) => s._id !== service._id);

    if (services.length === selectedServices.length) {
      // service not selected --> add it to list
      setSelectedServices([...services, service]);
    } else {
      // service already selected --> remove it
      setSelectedServices(services);
    }
  };

  const clearServices = () => {
    setSelectedServices([]);
  };

  const serviceSelected = (id) => {
    return selectedServices.find((s) => s._id === id);
  };

  return (
    <BackImage source={require('../../assets/bg/bg1.png')}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Selectionez vos services</Text>
        </View>
        {loading ? (
          <View style={{...styles.mainView, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#38B4DD" />
          </View>
        ) : (
          <>
            <View style={styles.mainView}>
              <ServiceFilter
                select={selectService}
                selected={serviceSelected}
                nbSelected={selectedServices.length}
                clear={clearServices}
              />
            </View>
            <View style={styles.bottom}>
              {selectedServices.length !== 0 && (
                <TouchableOpacity
                  onPress={submitServices}
                  style={styles.confirmBtn}>
                  <Entypo name="check" color="white" size={40} />
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    </BackImage>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  header: {
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    alignSelf: 'center',
    alignItems: 'center',
    height: '60%',
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  text: {
    color: '#666666',
    fontSize: 20,
  },
  title: {
    fontSize: 25,
    color: 'white',
    // marginBottom: 40,
    textAlign: 'center',
  },
  bottom: {
    height: '15%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "red",
  },
  confirmBtn: {
    backgroundColor: '#38B4DD',
    borderRadius: 10,
    paddingHorizontal: 150,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});

export default AuthServiceForm;
