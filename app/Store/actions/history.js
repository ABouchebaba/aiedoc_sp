import {
  GET_COMMANDS,
  ERROR_GET_COMMANDS,
  GET_COMMANDS_LOADING,
  GET_INTERVENTIONS,
  ERROR_GET_INTERVENTIONS,
  GET_INTERVENTIONS_LOADING,
} from "../../constants/ActionTypes";

import { commands, interventions } from "../api";

export const getCommands = (id) => (dispatch) => {
  dispatch({ type: GET_COMMANDS_LOADING });
  commands(id)
    .then((res) => {
      console.log("Get commands - got results : " + res.data.length);
      return dispatch({
        type: GET_COMMANDS,
        data: res.data,
      });
    })
    .catch((err) => {
      console.log("Get commands - got error : " + err.message);
      return dispatch({
        type: ERROR_GET_COMMANDS,
        data: err.message,
      });
    });
};

export const getInterventions = (id) => (dispatch) => {
  dispatch({ type: GET_INTERVENTIONS_LOADING });
  interventions(id)
    .then((res) => {
      console.log("Get interventions - got results : " + res.data.length);
      return dispatch({
        type: GET_INTERVENTIONS,
        data: res.data,
      });
    })
    .catch((err) => {
      console.log("Get interventions - got error : " + err.message);
      return dispatch({
        type: ERROR_GET_INTERVENTIONS,
        data: err.message,
      });
    });
};
