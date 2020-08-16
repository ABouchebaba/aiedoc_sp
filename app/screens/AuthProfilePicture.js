import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Button from '../components/Button';
import {BackImage} from '../components/';
import * as DocumentPicker from 'expo-document-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AuthProfilePicture = (props) => {
  const [files, setFiles] = useState({
    picture: null,
    extNaissance: null,
    residence: null,
    idCard: null,
  });

  const enabled = Object.keys(files).reduce((p, c) => p && files[c], true);

  const pickFile = (key, type) => async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type,
    });

    if (result.type === 'success') {
      const file = {
        uri: result.uri,
        name: result.name,
      };
      setFiles({...files, [key]: file});
    }
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
          onPress={pickFile('extNaissance', '*/*')}>
          <Text style={styles.selectFileText}>Extrait de naissance</Text>
          {files.extNaissance ? (
            <AntDesign name="check" size={30} color="white" />
          ) : (
            <AntDesign name="addfile" size={30} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={files.residence ? styles.selected : styles.notSelected}
          onPress={pickFile('residence', '*/*')}>
          <Text style={styles.selectFileText}>Résidence</Text>
          {files.residence ? (
            <AntDesign name="check" size={30} color="white" />
          ) : (
            <AntDesign name="addfile" size={30} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={files.idCard ? styles.selected : styles.notSelected}
          onPress={pickFile('idCard', '*/*')}>
          <Text style={styles.selectFileText}>Carte d'identité</Text>
          {files.idCard ? (
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
    color: '#4eaaff',
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
    paddingHorizontal:20,
    borderRadius:10
  },
  selected: {
    backgroundColor: 'green',
    height: 50,
    width: '70%',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal:20,
    borderRadius:10
  },
});

export default AuthProfilePicture;
