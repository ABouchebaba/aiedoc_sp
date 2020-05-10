import * as DocumentPicker from 'expo-document-picker';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {BackImage} from '../components/';
import Button from '../components/Button';

const AuthProForm = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const [job, setJob] = useState('');
  const [diplomes, setDiplomes] = useState([]);
  const [diplome, setDiplome] = useState({
    type: '',
    file: '',
    description: '',
  });
  const disabled = !(
    diplome.type !== '' &&
    diplome.file !== '' &&
    diplome.description !== ''
  );
  const disabledValidation = !(job !== '' && diplomes.length !== 0);

  async function addDiplome() {
    diplomes.push(diplome);
    setDiplome({type: '', file: '', description: ''});
  }

  function _deleteDocument(file) {
    const list = diplomes.filter(
      (x) => x.name !== file.name || x.file !== file.file,
    );
    setDiplomes(list);
  }

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    const file = {
      uri: result.uri,
      name: result.name,
    };
    setDiplome({...diplome, file});
  };

  const submit = () => {
    const info = props.route.params;

    const descriptions = [];
    const files = [];
    const types = [];
    diplomes.map(async (x) => {
      descriptions.push(x.description);
      types.push(x.type);
      files.push(x.file);
    });

    props.navigation.navigate('AuthServiceForm', {
      ...info,
      jobTitle: job,
      descriptions: descriptions,
      types: types,
      files: files,
    });
  };

  return (
    <BackImage source={require('../../assets/bg/bg1.png')}>
      {loading ? (
        <View style={styles.mainView}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <View style={styles.mainView}>
          <Text style={styles.title}>Informations personnelle</Text>
          <View style={{width: '90%'}}>
            <Text style={styles.label}>Profession</Text>
            <TextInput
              placeholder="Médecin, infirmière"
              onChangeText={setJob}
              style={styles.TextInput}
              maxLength={30}
            />
          </View>
          <View style={{width: '90%'}}>
            <Text style={styles.label}>Diplômes</Text>
            <View>
              <View style={styles.row}>
                <TextInput
                  value={diplome.type}
                  placeholder="Type de diplôme"
                  onChangeText={(value) =>
                    setDiplome({...diplome, type: value})
                  }
                  style={{...styles.TextInput, width: '80%'}}
                />
                {diplome.file == '' ? (
                  <TouchableOpacity style={styles.icon} onPress={_pickDocument}>
                    <AntDesign name="addfile" size={30} color="white" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{...styles.icon, backgroundColor: 'green'}}
                    onPress={_pickDocument}>
                    <AntDesign name="check" size={30} color="white" />
                  </TouchableOpacity>
                )}
              </View>
              <TextInput
                multiline
                value={diplome.description}
                numberOfLines={2}
                placeholder="Description"
                onChangeText={(value) =>
                  setDiplome({...diplome, description: value})
                }
                style={{
                  ...styles.TextInput,
                  borderRadius: 10,
                  textAlignVertical: 'top',
                }}
              />
              <Button
                title="+"
                onPress={addDiplome}
                disabled={disabled}
                style={{width: '20%', marginTop: 0, paddingVertical: 0}}
                textStyle={{fontSize: 30}}
              />
            </View>
          </View>
          {diplomes.length > 0 && (
            <ScrollView style={styles.scrollView}>
              {diplomes.map((x, i) => (
                <View style={styles.row} key={i}>
                  <TextInput
                    value={x.type}
                    editable={false}
                    style={{
                      ...styles.TextInput,
                      width: '80%',
                      borderRadius: 10,
                      backgroundColor: '#11A0C1',
                      color: 'white',
                    }}
                  />
                  <TouchableOpacity
                    style={{...styles.icon, backgroundColor: 'red'}}
                    onPress={() => _deleteDocument(x)}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={30}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
          <Button
            title="S'INSCRIRE"
            onPress={submit}
            disabled={disabledValidation}
            style={{marginVertical: 10}}
          />
        </View>
      )}
    </BackImage>
  );
};

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    flex: 1,
    // backgroundColor: "red",
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    color: 'white',
    marginBottom: 40,
  },
  TextInput: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    borderRadius: 50,
    paddingLeft: 20,
    fontSize: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  buttonWhite: {
    backgroundColor: '#F2F2F2',
    borderRadius: 50,
    paddingLeft: 20,
    fontSize: 20,
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  label: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
  },
  icon: {
    backgroundColor: '#11A0C1',
    width: '100%',
    borderRadius: 50,
    fontSize: 20,
    padding: 10,
  },
  scrollView: {
    backgroundColor: '#cadce6',
    width: '90%',
    paddingHorizontal: 10,
    marginVertical: 15,
  },
});

export default AuthProForm;
