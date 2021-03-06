import * as DocumentPicker from 'expo-document-picker';
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {BackImage} from '../components/';
import Button from '../components/Button';
import {Picker} from '@react-native-community/picker';
import CheckBox from '@react-native-community/checkbox';
import ImagePicker from 'react-native-image-picker';
import {getServices} from '../Store/actions';

/* const jobsList = [
  '---',
  'medecin generaliste',
  'pediatre',
  'diabetologue',
  'endocrinologue',
  'dermatologue',
  'rhumatologue',
  'cardiologue',
  'neurologue',
  'psychiatre',
  'psychologue',
  'ortophoniste',
  'infirmier',
  'auxilliaire de vie',
  'puericultrice',
  'sage femme',
  'soin des ongles et cheveux',
]; */

const AuthProForm = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const {services} = useSelector((state) => state.services);
  const jobsList = services.filter(x=> x.level==="SubFamily")
  const [job, setJob] = useState('');
  const [multiDiplome, setMultiDiplome] = useState(false);
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

  useEffect(() => {
    dispatch(getServices());
  }, []);

  const disabledValidation = multiDiplome
    ? !(job !== '---' && diplomes.length > 0)
    : !(job !== '---' && !disabled);

  async function addDiplome() {
    diplomes.push(diplome);
    setDiplome({type: '', file: '', description: ''});
    Keyboard.dismiss();
  }

  function _deleteDocument(file) {
    const list = diplomes.filter(
      (x) => x.name !== file.name || x.file !== file.file,
    );
    setDiplomes(list);
  }

  const _pickDocument = async () => {
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
        console.log('file name : ', response.fileName);
        console.log('file size : ', response.fileSize / (1024 * 1024));
        console.log('file uri : ', response.uri);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setDiplome({...diplome, file});
      }
    });
  };

  const submit = () => {
    const info = props.route.params;
    const descriptions = [];
    const files = [];
    const types = [];

    if (!multiDiplome) {
      setDiplomes([diplome]);
      descriptions.push(diplome.description);
      types.push(diplome.type);
      files.push(diplome.file);
    } else {
      diplomes.map(async (x) => {
        descriptions.push(x.description);
        types.push(x.type);
        files.push(x.file);
      });
    }
    /* console.log('result : ', {
      jobTitle: job,
      descriptions: descriptions,
      types: types,
      files: files,
    }); */
    props.navigation.navigate('AuthServiceForm', {
      ...info,
      jobTitle: job,
      descriptions: descriptions,
      types: types,
      files: files,
    });
  };

  const changeStatus = (value) => {
    setMultiDiplome(value);
    if (!value) {
      setDiplomes([]);
    } else if (value && diplomes.length !== 0) {
      setDiplome({type: '', file: '', description: ''});
    }
  };

  return (
    <BackImage source={require('../../assets/bg/bg1.png')}>
      {loading ? (
        <View style={styles.mainView}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <View style={styles.mainView}>
          <Text style={styles.title}>Informations professionnelles</Text>
          <View style={{width: '90%'}}>
            <Text style={styles.label}>Profession</Text>
            <View style={styles.buttonWhite}>
              <Picker
                selectedValue={job}
                itemStyle={{fontSize: 20}}
                style={{fontSize: 20}}
                onValueChange={(itemValue) => setJob(itemValue)}>
                {jobsList.map((job, i) => (
                  <Picker.Item key={i} label={job.name.toUpperCase()} value={job.name} />
                ))}
              </Picker>
            </View>
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
              <View style={styles.checkContainer}>
                <View
                  style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
                  <CheckBox
                    tintColors={{
                      true: 'white',
                      false: '#F2F2F2',
                    }}
                    onAnimationType={'bounce'}
                    offAnimationType={'stroke'}
                    style={styles.check}
                    value={multiDiplome}
                    onValueChange={changeStatus}
                  />
                  <Text style={styles.text}>Ajouter plusieurs diplomes</Text>
                </View>
                {multiDiplome ? (
                  <Button
                    title="+"
                    onPress={addDiplome}
                    disabled={disabled}
                    style={{width: '20%', marginTop: 0, paddingVertical: 0}}
                    textStyle={{fontSize: 22}}
                  />
                ) : (
                  <View
                    style={{width: '20%', marginTop: 0, paddingVertical: 0}}
                  />
                )}
              </View>
            </View>
          </View>
          {diplomes.length > 0 && multiDiplome && (
            <ScrollView style={styles.scrollView}>
              {diplomes.map((x, i) => (
                <View style={{...styles.row, justifyContent: 'center'}} key={i}>
                  <Text style={styles.diplomeRow}>{x.type.slice(0, 20)}</Text>
                  <TouchableOpacity
                    style={styles.diplomeIcon}
                    onPress={() => _deleteDocument(x)}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={25}
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
            style={{marginVertical: 10, height: '8%'}}
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
    borderRadius: 10,
    paddingLeft: 20,
    fontSize: 20,
    marginBottom: 10,
  },
  diplomeRow: {
    backgroundColor: '#F2F2F2',
    paddingLeft: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    fontSize: 20,
    height: 35,
    marginBottom: 10,
    width: '80%',
    color: 'black',
    alignSelf: 'center',
  },
  diplomeIcon: {
    backgroundColor: 'red',
    width: '100%',
    height: 35,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  buttonWhite: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 20,
    marginBottom: 25,
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
    fontSize: 22,
    textAlign: 'left',
    paddingLeft: 10,
    marginBottom: 10,
  },
  icon: {
    backgroundColor: '#11A0C1',
    width: '100%',
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
  },
  checkContainer: {
    flexDirection: 'row',
    // margin: 20,
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    width: '100%',
  },
  check: {
    color: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // marginVertical: 5,
  },
  text: {
    fontSize: 18,
    color: '#F2F2F2',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginVertical: 2,
    // backgroundColor:'blue'
  },
  scrollView: {
    backgroundColor: '#cadce6',
    width: '90%',
    padding: 10,
    marginVertical: 15,
  },
});

export default AuthProForm;
