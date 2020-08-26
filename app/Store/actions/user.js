import {
  SET_USER,
  SET_USER_DATA,
  UNSET_USER,
  USER_LOADING,
  SET_USER_PICTURE,
  ERROR_USER,
} from '../../constants/ActionTypes';
import {
  validatePin,
  getUserWithPhone,
  registerUser,
  setState,
  update_picture,
} from '../api';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import OneSignal from 'react-native-onesignal';

import {Platform} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export const login = (info, callbacks) => (dispatch) => {
  dispatch({type: USER_LOADING});

  // verify if pin code is correct
  validatePin(info.verificationId, info.verificationCode)
    .then((res) => {
      // Correct pin code !!
      // then check phone number in backend
      console.log('firebase working ', res.data);
      OneSignal.getPermissionSubscriptionState(({userId}) => {
        getUserWithPhone({
          phoneNumber: info.phoneNumber,
          pushNotificationId: userId,
        })
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

export const updatePicture = (id, picture, token) => (dispatch) => {
  dispatch({type: USER_LOADING});

  let data = [
    {
      name: 'picture',
      filename: picture.name,
      data: RNFetchBlob.wrap(picture.uri),
    },
  ];

  update_picture(id, data, token)
    .then((res) => {
      if (res.info().status == 200) {
        console.log('received res : ', res.data);
        dispatch({
          type: SET_USER_PICTURE,
          data: res.data,
        });
      } else {
        console.log(res?.text()); // this is the handeled error message in backend
        alert('Une erreur est survenue, veuillez réessayer.');
        dispatch({
          type: ERROR_USER,
          data: err.message,
        });
      }
    })
    .catch((err) => {
      console.log(
        'error updating picture : ' + err?.response?.data || err.message,
      );
      alert(
        'Une erreur est survenue lors du chargement de la photo de profile',
      );
      return dispatch({
        type: ERROR_USER,
        data: err.message,
      });
    });
};

export const register = (user, setLoading) => (dispatch) => {
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

  data = [
    ...data,
    {
      name: 'picture',
      filename: user.picture.name,
      data: RNFetchBlob.wrap(user.picture.uri),
    },
    {
      name: 'extNaissance',
      filename: user.extNaissance.name,
      data: RNFetchBlob.wrap(user.extNaissance.uri),
    },
    {
      name: 'residence',
      filename: user.residence.name,
      data: RNFetchBlob.wrap(user.residence.uri),
    },
    {
      name: 'idCard',
      filename: user.idCard.name,
      data: RNFetchBlob.wrap(user.idCard.uri),
    },
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
          setLoading(false);
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
        setLoading(false);
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

export const logout = (user) => async (dispatch) => {
  const {_id} = user;
  try {
    const {status, permissions} = await Permissions.askAsync(
      Permissions.LOCATION,
    );
    if (status !== 'granted') {
      // throw new Error("Permission to access location was denied");
      alert("La permission d'accés à la localisation non-accordée");
      return;
    }
  } catch (err) {
    console.log(err.message);
    alert('Une erreur est survenue.');
    return;
  }

  let {coords} = await Location.getCurrentPositionAsync({
    accuracy: 5,
    enableHighAccuracy: true,
  });
  const {longitude, latitude} = coords;

  setState(_id, 'notReady', longitude, latitude)
    .then((res) => {
      delete axios.defaults.headers.common['x-auth-token'];
      return dispatch({
        type: UNSET_USER,
      });
    })
    .catch((err) => {
      console.log('Logout - got error : ' + err.message);
      return dispatch({
        type: ERROR_USER,
        data: err.message,
      });
    });
};

export const setUser = (user) => (dispatch) => {
  dispatch({
    type: SET_USER_DATA,
    data: user,
  });
};
