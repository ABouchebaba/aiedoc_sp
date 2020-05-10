import {SET_USER, UNSET_USER, USER_LOADING} from '../../constants/ActionTypes';
import {validatePin, getUserWithPhone, registerUser} from '../api';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

import {Platform} from 'react-native';
import * as Permissions from 'expo-permissions';

export const login = (info, callbacks) => (dispatch) => {
  dispatch({type: USER_LOADING});

  // verify if pin code is correct
  validatePin(info.verificationId, info.verificationCode)
    .then((res) => {
      // Correct pin code !!
      // then check phone number in backend
      console.log(res.data);
      getUserWithPhone(info.phoneNumber)
        .then((res) => {
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
          callbacks.onVerfiyPhoneError(err);
        });
    })
    // user typed wrong pin code
    .catch((err) => {
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
  ];

  for (let i = 0; i < user.files.length; i++) {
    data = [
      ...data,
      {name: 'types', data: user.types[i]},
      {name: 'descriptions', data: user.descriptions[i]},
      {
        name: 'docs',
        filename: user.files[i].name,
        data: RNFetchBlob.wrap(user.files[i].uri),
      },
    ];
  }

  registerUser(data)
    .then((res) => {
      if (res.info().status == 200) {
        console.log(res.info().headers['x-auth-token']); // retrieve auth token
        console.log(res.json()); // equivalent of res.data

        dispatch({
          type: SET_USER,
          data: res.json(),
          token: res.info().headers['x-auth-token'],
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

export const logout = () => (dispatch) => {
  delete axios.defaults.headers.common['x-auth-token'];
  return dispatch({
    type: UNSET_USER,
  });
};

// export const expoHagdak = async () => {
//   const { status: existingStatus } = await Permissions.getAsync(
//     Permissions.NOTIFICATIONS
//   );
//   let finalStatus = existingStatus;
//   if (existingStatus !== "granted") {
//     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//     finalStatus = status;
//   }
//   if (finalStatus !== "granted") {
//     alert("Failed to get push token for push notification!");
//     return;
//   }
//   token = await Notifications.getExpoPushTokenAsync();
//   console.log(token);
//   // return token

//   if (Platform.OS === "android") {
//     Notifications.createChannelAndroidAsync("default", {
//       name: "default",
//       sound: true,
//       priority: "max",
//       vibrate: [0, 250, 250, 250],
//     });
//   }
// };
