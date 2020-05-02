import {
  SET_USER_STATE,
  USER_LOADING,
  ERROR_USER,
} from "../../constants/ActionTypes";
import { setState } from "../api";

export const setOnlineState = (id, state) => (dispatch) => {
  dispatch({ type: USER_LOADING });

  setState(id, state)
    .then((res) => {
      // console.log("Set sp state - " + res.data);
      return dispatch({
        type: SET_USER_STATE,
        data: res.data,
      });
    })
    .catch((err) => {
      console.log("Set sp state - got error : " + err.message);
      return dispatch({
        type: ERROR_USER,
        data: err.message,
      });
    });
};
