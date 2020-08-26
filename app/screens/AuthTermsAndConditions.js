import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {register} from '../Store/actions';
import {BackImage} from '../components';
import CheckBox from '@react-native-community/checkbox';
import TermsAndConditionsText from '../constants/TermsAndConditions';

const AuthTermsAndConditions = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [accepted, setAccepted] = useState(false);

  const submit = () => {
    setLoading(true);
    dispatch(register(props.route.params, setLoading));
  };

  return (
    <BackImage source={require('../../assets/bg/bg1.png')}>
      {!loading ? (
        <Text style={styles.title}>Conditions d'utilisation</Text>
      ) : (
        <></>
      )}

      {!loading ? (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.terms}>{TermsAndConditionsText}</Text>

          <View style={styles.checkContainer}>
            <CheckBox
              tintColors={{
                true: 'black',
                false: 'black',
              }}
              style={styles.check}
              value={accepted}
              onValueChange={setAccepted}
            />
            <Text style={styles.text}>
              J'accepte les conditions générales et la politique de
              confidentialité
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.btn, styles.validate]}
            disabled={!accepted}
            onPress={submit}>
            <Text style={[styles.btnText]}>S'inscrire</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="white" />
      )}
    </BackImage>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    margin: 10,
  },
  btn: {
    backgroundColor: '#38B4DD',
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  checkContainer: {
    flexDirection: 'row',
    margin: 20,
    alignSelf: 'center',
  },
  check: {
    color: 'black',
  },
  validate: {
    width: '50%',
    alignSelf: 'center',
    padding: 10,
    marginBottom: 20,
  },
  bigBtn: {
    width: '75%',
    alignSelf: 'center',
    marginVertical: 100,
    padding: 10,
  },
  terms: {
    color: 'black',
  },
  container: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 5,
  },
});

export default AuthTermsAndConditions;
