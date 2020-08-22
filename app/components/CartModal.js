import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

navigator.geolocation = require('@react-native-community/geolocation');

export const CartModal = (props) => {
  // const intervention = props.intervention
  const [address, setAdresse] = useState('');
  // const [wilaya, setWilaya] = useState('');
  const [location, setLocation] = useState({});

  function submit() {
    if (address.length > 0) {
      const data = {
        address: address,
        location: location,
      };
      setAdresse('');
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
        <Text style={styles.title}>Veuillez entrer votre addresse</Text>
        <View style={styles.inputGroup}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            styles={{
              textInputContainer: {
                backgroundColor: 'rgba(0,0,0,0)',
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 50,
                borderRadius: 10,
                color: '#5d5d5d',
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
              listView: {
                backgroundColor: 'white',
              },
            }}
            onFail={(err) => {
              console.log(err);
            }}
            minLength={4}
            onPress={(data) => {
              setAdresse(data.description);
              // 'details' is provided when fetchDetails = true
              console.log(data.description);
            }}
            query={{
              key: 'AIzaSyCUuoEMDG-YlZJFjaZw7cRfsegAsjmC4EM',
              language: 'fr',
              components: 'country:dz',
            }}
            currentLocation={true}
            currentLocationLabel="Postion actuelle"
          />
        </View>
        {/* <View style={styles.inputGroup}>
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
        </View> */}
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
    marginBottom: 20,
  },
  inputGroup: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 0,
    flex: 0.7,
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
    marginBottom: 50,
  },
});
