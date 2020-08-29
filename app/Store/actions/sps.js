import {
  SET_USER_STATE,
  USER_LOADING,
  ERROR_USER,
} from '../../constants/ActionTypes';
import {setState} from '../api';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export const setOnlineState = (id, state) => async (dispatch) => {
  dispatch({type: USER_LOADING});

  try {
    const {status, permissions} = await Permissions.askAsync(
      Permissions.LOCATION,
    );
    if (status !== 'granted') {
      // throw new Error("Permission to access location was denied");
      alert("La permission d'accés à la localisation non-accordée");
      return dispatch({
        type: ERROR_USER,
        data: err.message,
      });;
    }
  } catch (err) {
    console.log(err.message);
    alert("La permission d'accés à la localisation est nécessaire.");
    return dispatch({
      type: ERROR_USER,
      data: err.message,
    });;
  }

  let {coords} = await Location.getCurrentPositionAsync({
    accuracy: 5,
    enableHighAccuracy: true,
  });
  const {longitude, latitude} = coords;
  console.log('coords : ', longitude, latitude);

  setState(id, state, longitude, latitude)
    .then((res) => {
      // console.log("Set sp state - " + res.data);
      return dispatch({
        type: SET_USER_STATE,
        data: res.data,
      });
    })
    .catch((err) => {
      console.log('Set sp state - got error : ' + err.message);
      return dispatch({
        type: ERROR_USER,
        data: err.message,
      });
    });
};
