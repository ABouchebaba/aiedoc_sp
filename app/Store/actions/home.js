import { SET_LOCATION, LOGIN_LOADING } from "../../constants/ActionTypes";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export const getLocation = () => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });

  const { status, permissions } = await Permissions.askAsync(
    Permissions.LOCATION
  );
  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }
  let { coords } = await Location.getCurrentPositionAsync({
    accuracy: 5,
    enableHighAccuracy: true,
  });
  dispatch({
    type: SET_LOCATION,
    data: coords,
  });
};
