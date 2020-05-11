import {
  SET_USER,
  SET_USER_DATA,
  UNSET_USER,
  USER_LOADING,
} from '../../constants/ActionTypes';
import {validatePin, getUserWithPhone, registerUser} from '../api';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import OneSignal from 'react-native-onesignal';

import {Platform} from 'react-native';
import * as Permissions from 'expo-permissions';

export const login = (info, callbacks) => (dispatch) => {
  dispatch({type: USER_LOADING});

  // verify if pin code is correct
  validatePin(info.verificationId, info.verificationCode)
    .then((res) => {
      // Correct pin code !!
      // then check phone number in backend
      console.log('firebase working ', res.data);
      getUserWithPhone(info.phoneNumber)
        .then((res) => {
          console.log('token :: ' + res.headers['x-auth-token']);
          // user already registred
          // so user goes home
          dispatch({
            type: SET_USER,
            data: res.data,
            token: res.headers['x-auth-token'],
          });
        })
        // user not registred
        .catch((err) => {
          dispatch({
            type: UNSET_USER,
          });
          console.log('user not registered');
          callbacks.onVerfiyPhoneError(err);
        });
    })
    // user typed wrong pin code
    .catch((err) => {
      console.log('user types wrong pin code');
      dispatch({
        type: UNSET_USER,
      });
      callbacks.onPinError(err);
    });
};

export const register = (user) => (dispatch) => {
  dispatch({type: USER_LOADING});

  let data = [
    {name: 'phone', data: user.phone},
    {name: 'firstname', data: user.firstname},
    {name: 'lastname', data: user.lastname},
    {name: 'birthdate', data: user.birthdate},
    {name: 'email', data: user.email},
    {name: 'wilaya', data: user.wilaya},
    {name: 'commune', data: user.commune},
    {name: 'jobTitle', data: user.jobTitle},
    {name: 'sex', data: user.sex},
    {name: 'services', data: JSON.stringify(user.services)},
    {name: 'types', data: JSON.stringify(user.types)},
    {name: 'descriptions', data: JSON.stringify(user.descriptions)},
  ];

  for (let i = 0; i < user.files.length; i++) {
    data = [
      ...data,
      {
        name: 'docs',
        filename: user.files[i].name,
        data: RNFetchBlob.wrap(user.files[i].uri),
      },
    ];
  }

  const onIds = ({pushToken, userId}) => {
    data = [...data, {name: 'pushNotificationId', data: userId}];

    registerUser(data)
      .then((res) => {
        if (res.info().status == 200) {
          const headers = res.info().headers;
          const token = headers['X-Auth-Token'] || headers['x-auth-token'];
          dispatch({
            type: SET_USER,
            data: res.json(),
            token: token,
          });
        } else {
          // server error : equivalent to normal catch
          console.log(res?.text()); // this is the handeled error message in backend
          alert('Une erreur est survenue, veuillez réessayer.');
        }
      })
      .catch((err) => {
        dispatch({
          type: UNSET_USER,
        });
        // alert("Veuillez vérifier votre connexion internet");
        console.log(err);
        console.log('error: ' + err?.response?.data || err.message);
      });
  };

  // once the token is received, send register request
  // to backend (onIds)
  OneSignal.addEventListener('ids', onIds);

  // this will call OneSignal to get push token
  // for this user
  OneSignal.init('aac6ed8b-9b71-4cd7-95c4-dc0931101a87', {
    kOSSettingsKeyAutoPrompt: false,
    kOSSettingsKeyInAppLaunchURL: false,
    kOSSettingsKeyInFocusDisplayOption: 2,
  });
};

export const logout = () => (dispatch) => {
  delete axios.defaults.headers.common['x-auth-token'];
  return dispatch({
    type: UNSET_USER,
  });
};

export const setUser = (user) => (dispatch) => {
  dispatch({
    type: SET_USER_DATA,
    data: user,
  });
};
