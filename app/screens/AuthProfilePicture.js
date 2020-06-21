import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import {BackImage} from '../components/';
import * as DocumentPicker from 'expo-document-picker';

const AuthProfilePicture = (props) => {
  const [selectedPicture, setSelectedPicture] = useState(null);

  const pickPicture = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: 'image/*',
    });

    if (result.type === 'success') {
      const picture = {
        uri: result.uri,
        name: result.name,
      };

      setSelectedPicture(picture);
    }
  };

  const submit = () => {
    const info = props.route.params;

    props.navigation.navigate('AuthProForm', {
      ...info,
      picture: selectedPicture,
    });
  };

  return (
    <BackImage source={require('../../assets/bg/bg1.png')}>
      <View style={styles.mainView}>
        <TouchableOpacity onPress={pickPicture}>
          {selectedPicture ? (
            <Image
              source={{uri: selectedPicture.uri}}
              //   resizeMethod="scale"
              resizeMode="center"
              style={styles.picture}
            />
          ) : (
            <View style={styles.selectPicture}>
              <Text style={styles.selectPictureText}>
                Selectionner une photo de profile
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <Button
          title="Valider"
          onPress={submit}
          disabled={!Boolean(selectedPicture)}
        />
      </View>
    </BackImage>
  );
};

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  picture: {
    minWidth: 250,
    minHeight: 250,
    maxWidth: 350,
    maxHeight: 350,
    borderRadius: 20,
    margin: 20,
  },
  selectPicture: {
    backgroundColor: '#efefef',
    borderRadius: 100,
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  selectPictureText: {
    fontSize: 18,
    color: '#4eaaff',
    textAlign: 'center',
    padding: 10,
  },
});

export default AuthProfilePicture;
