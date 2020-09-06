import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Button from '../components/Button';
import {BackImage} from '../components/';
import * as DocumentPicker from 'expo-document-picker';
import ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AuthProfilePicture = (props) => {
  const [files, setFiles] = useState({
    picture: null,
    extNaissance: null,
    residence: null,
    idCard: null,
    casierJudiciaire: null,
  });

  const enabled = Object.keys(files).reduce((p, c) => p && files[c], true);

  const pickFile = (key, type) => async () => {
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
        const file = {uri: response.uri, name: response.fileName};
        // console.log('file name : ', response.fileName);
        // console.log('file size : ', response.fileSize / (1024 * 1024));
        // console.log('file uri : ', response.uri);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setFiles({...files, [key]: file});
      }
    });
  };

  const submit = () => {
    const info = props.route.params;

    props.navigation.navigate('AuthProForm', {
      ...info,
      ...files,
    });
  };

  return (
    <BackImage source={require('../../assets/bg/bg1.png')}>
      <View style={styles.mainView}>
        <TouchableOpacity onPress={pickFile('picture', 'image/*')}>
          {files.picture ? (
            <Image
              source={{uri: files.picture.uri}}
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

        <TouchableOpacity
          style={files.extNaissance ? styles.selected : styles.notSelected}
          onPress={pickFile('extNaissance', 'image/*')}>
          <Text style={styles.selectFileText}>Extrait de naissance</Text>
          {files.extNaissance ? (
            <AntDesign name="check" size={30} color="white" />
          ) : (
            <AntDesign name="addfile" size={30} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={files.residence ? styles.selected : styles.notSelected}
          onPress={pickFile('residence', 'image/*')}>
          <Text style={styles.selectFileText}>Résidence</Text>
          {files.residence ? (
            <AntDesign name="check" size={30} color="white" />
          ) : (
            <AntDesign name="addfile" size={30} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={files.idCard ? styles.selected : styles.notSelected}
          onPress={pickFile('idCard', 'image/*')}>
          <Text style={styles.selectFileText}>Carte d'identité</Text>
          {files.idCard ? (
            <AntDesign name="check" size={30} color="white" />
          ) : (
            <AntDesign name="addfile" size={30} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={files.casierJudiciaire ? styles.selected : styles.notSelected}
          onPress={pickFile('casierJudiciaire', 'image/*')}>
          <Text style={styles.selectFileText}>Casier Judiciaire</Text>
          {files.casierJudiciaire ? (
            <AntDesign name="check" size={30} color="white" />
          ) : (
            <AntDesign name="addfile" size={30} color="white" />
          )}
        </TouchableOpacity>

        <Button title="Valider" onPress={submit} disabled={!enabled} />
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
    color: '#11A0C1',
    textAlign: 'center',
    padding: 10,
  },
  selectFile: {
    margin: 10,
  },
  selectFileText: {
    color: 'white',
    fontSize: 18,
  },
  notSelected: {
    backgroundColor: '#11A0C1',
    height: 50,
    width: '70%',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  selected: {
    backgroundColor: 'green',
    height: 50,
    width: '70%',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default AuthProfilePicture;
