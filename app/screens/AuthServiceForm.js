import Entypo from 'react-native-vector-icons/Entypo';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import {useDispatch, useSelector} from 'react-redux';
import {BackImage} from '../components';
import {getServices, register} from '../Store/actions';

const AuthServiceForm = (props) => {
  const infos = props.route.params;
  const dispatch = useDispatch();
  const {services, loading} = useSelector((state) => state.services);
  const [userService, setUserServices] = useState([]);

  console.log(services.reduce((p, c) => [...p, c.services], []));

  function submitServices() {
    // const services = userService.map((x) => x.value.split(' -- ')[1]);
    const data = {...infos, services: userService};
    // console.log(data);
    const formData = new FormData();
    // Object.keys(data).forEach((key) => formData.append(key, data[key]));
    // console.log(formData)
    formData.append('phone', data.phone);
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);
    formData.append('birthdate', data.birthdate);
    formData.append('email', data.email);
    formData.append('wilaya', data.wilaya);
    formData.append('commune', data.commune);
    formData.append('jobTitle', data.jobTitle);
    formData.append('sex', data.sex);
    formData.append('files', data.files);
    formData.append('types', data.types);
    formData.append('descriptions', data.descriptions);

    // for (let i = 0; i < data.files.length; i++) {
    //   formData.append('files', data.files[i]);
    //   formData.append('types', data.types[i]);
    //   formData.append('descriptions', data.descriptions[i]);
    // }
    // console.log(formData);

    dispatch(register(formData));
  }

  useEffect(() => {
    dispatch(getServices());
  }, []);

  return (
    <BackImage source={require('../../assets/bg/bg1.png')}>
      <View style={styles.container}>
        <Text style={styles.title}>Selectionez vos services</Text>
        {loading ? (
          <View style={{...styles.mainView, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#38B4DD" />
          </View>
        ) : (
          <View style={styles.mainView}>
            <SelectMultiple
              style={{padding: 10}}
              labelStyle={styles.text}
              selectedLabelStyle={{color: 'blue'}}
              rowStyle={{backgroundColor: 'rgba(255,255,255,0)'}}
              checkboxStyle={{borderColor: '#4EC7E6'}}
              items={services.reduce(
                (services, type) => [
                  ...services,
                  ...type.services.map((s) => s.name),
                ],
                [],
              )}
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
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
  },
  header: {
    height: '10%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  mainView: {
    marginHorizontal: 30,
    alignSelf: 'center',
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
});

export default AuthServiceForm;
