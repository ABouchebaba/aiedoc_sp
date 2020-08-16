import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {getLocationForCommand} from '../Store/actions';
import {Picker} from '@react-native-community/picker';

const wilayas = require('../helpers/wilayas.json');

export const CartModal = (props) => {
  // const intervention = props.intervention
  const [address, setAdresse] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [location, setLocation] = useState({});

  /* useEffect(() => {
    getLocationForCommand().then((res) => {
      console.log(res);
      setLocation(res);
    });
  }, []); */

  function submit() {
    if (address.length > 5 && wilaya !== '') {
      const data = {
        address: address,
        wilaya: wilaya,
        location: location,
      };
      setAdresse('');
      setWilaya('');
      setLocation({});
      return props.submit(data);
    }
    Alert.alert('Erreur', 'Veuillez compléter le formulaire');
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModel}
      onRequestClose={props.close}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.modelCard}>
        <Text style={styles.title}>Veuillez compléter le formulaire</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.text}>Adresse</Text>
          <TextInput
            editable={true}
            value={address}
            autoCompleteType="street-address"
            keyboardType="default"
            textContentType="streetAddressLine1"
            onChangeText={setAdresse}
            style={styles.TextInput}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.text}>Wilaya</Text>
          <View style={styles.wilayaInput}>
            <Picker
              selectedValue={wilaya}
              onValueChange={(value) => setWilaya(value)}
              style={{
                backgroundColor: '#efefef',
                // margin: 5,
              }}>
              <Picker.Item label="Wilaya..." value="" />
              {wilayas.map((w) => (
                <Picker.Item
                  key={w.code}
                  label={w.code + '- ' + w.nom}
                  value={w.nom}
                />
              ))}
            </Picker>
          </View>
        </View>
        <TouchableOpacity onPress={submit} style={styles.submit}>
          <Text style={{fontSize: 27, color: 'white'}}>Vérifier</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.close} style={styles.resend}>
          <Text style={{fontSize: 15, color: 'black'}}>Annuler</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modelCard: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#11A0C1',
    borderTopWidth: 10,
    borderColor: '#09748D',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 50,
  },
  inputGroup: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  text: {
    textAlign: 'left',
    fontSize: 20,
    color: 'white',
    paddingBottom: 10,
    paddingLeft: 5,
  },
  TextInput: {
    backgroundColor: '#F2F2F2',
    alignSelf: 'center',
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 15,
    color: '#0F95B9',
  },
  wilayaInput: {
    backgroundColor: '#F2F2F2',
    alignSelf: 'center',
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 8,
    fontSize: 15,
  },
  submit: {
    backgroundColor: '#09748D',
    marginTop: 30,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 50,
    width: '80%',
    alignSelf: 'center',
  },
  resend: {
    backgroundColor: 'white',
    marginTop: 30,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 50,
    width: '30%',
    alignSelf: 'center',
  },
});
