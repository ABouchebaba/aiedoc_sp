import Entypo from 'react-native-vector-icons/Entypo';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BackImage} from '../components';
import {BACKEND_URL} from 'react-native-dotenv';
import * as DocumentPicker from 'expo-document-picker';
import ImagePicker from 'react-native-image-picker';

import {updatePicture} from '../Store/actions';
import FastImage from 'react-native-fast-image';

const Profile = (props) => {
  const dispatch = useDispatch();
  const {user, token} = useSelector((state) => state.user);
  const [selectedPicture, setSelectedPicture] = useState({
    uri: BACKEND_URL + '/' + user.picture,
  });

  console.log(user.services);

  const picture_uri = selectedPicture.uri;

  // console.log(picture_uri);

  const changeProfilePicture = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      noData: true,
      storageOptions: {
        path: 'aiedoc',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const picture = {uri: response.uri, name: response.fileName};
        console.log('file name : ', response.fileName);
        console.log('file size : ', response.fileSize / (1024 * 1024));
        console.log('file uri : ', response.uri);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setSelectedPicture(picture);
      }
    });
  };

  const save_picture = () => {
    dispatch(updatePicture(user._id, selectedPicture, token));
  };

  return (
    <BackImage source={require('../../assets/bg/bgHome.png')}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={props.navigation.openDrawer}>
            <Entypo name="menu" size={50} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={changeProfilePicture}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <FastImage
              source={{uri: picture_uri, priority: FastImage.priority.high}}
              style={styles.picture}
            />
            {/* <Image source={{uri: picture_uri}} style={styles.picture} /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={save_picture} style={styles.save_picture}>
            <Entypo name="save" size={40} color="white" />
          </TouchableOpacity>
          <View style={styles.inputGroup}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              editable={false}
              value={user.email}
              style={styles.TextInput}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.text}>Nom complet</Text>
            <TextInput
              editable={false}
              value={user.firstname + ' ' + user.lastname}
              style={styles.TextInput}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.text}>Date d'inscription</Text>
            <TextInput
              editable={false}
              value={user.createdAt.slice(0, 10)}
              style={styles.TextInput}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.text}>Date de naissance</Text>
            <TextInput
              editable={false}
              value={user.birthdate.slice(0, 10)}
              style={styles.TextInput}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.text}>Numéro de téléphone</Text>
            <TextInput
              editable={false}
              value={user.phone}
              style={styles.TextInput}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.text}>Services</Text>
            <View style={styles.servicesContainer}>
              {user.services.map((s) => (
                <View key={s._id}>
                  <Text style={styles.services}>
                    {'  '}
                    {`\u2022 ${s.name}`}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          {/* <View style={styles.inputGroup}>
            <Button
              title={"changer le numéro de téléphone"}
              onPress={() => props.navigation.navigate("ChangePhoneNumber")}
            />
          </View> */}
        </ScrollView>
      </View>
    </BackImage>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
  },
  header: {
    height: '10%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  inputGroup: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  text: {
    textAlign: 'left',
    fontSize: 15,
    color: 'white',
    paddingBottom: 10,
  },
  TextInput: {
    backgroundColor: '#F2F2F2',
    alignSelf: 'center',
    width: '100%',
    borderRadius: 10,
    paddingLeft: 20,
    fontSize: 15,
    paddingVertical: 10,
    marginBottom: 30,
  },
  mainView: {
    height: '90%',
    justifyContent: 'flex-start',
  },
  picture: {
    backgroundColor: '#efefef',
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderWidth: 5,
    borderColor: '#11A0C1',
    borderRadius: 100,
  },
  save_picture: {
    position: 'absolute',
    right: 20,
    top: 150,
  },
  servicesContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  services: {
    textAlign: 'left',
    fontSize: 15,
    color: '#c0c0c0',
    paddingBottom: 10,
  },
});

export default Profile;
