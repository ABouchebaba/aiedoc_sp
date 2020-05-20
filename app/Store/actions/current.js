import {
  UNSET_CURRENT,
  SET_CURRENT,
  LOADING_CURRENT_INTERVENTION,
  STOP_LOADING,
  SET_CURRENT_INTERVENTION,
} from '../../constants/ActionTypes';
import {getInterventionById} from '../api/interventions';
import {Socket} from '../../helpers';

export const unsetCurrent = () => (dispatch) => {
  dispatch({
    type: UNSET_CURRENT,
  });
};

export const setCurrent = (intervention, client = false) => (dispatch) => {
  dispatch({
    type: SET_CURRENT,
    intervention,
    client,
  });
};
export const setCurrentIntervention = (intervention) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_INTERVENTION,
    intervention,
  });
};
export const loadCurrentIntervention = () => (dispatch) => {
  dispatch({
    type: LOADING_CURRENT_INTERVENTION,
  });
};

export const resetCurrentIntervention = (int_id, responses) => (dispatch) => {
  dispatch(loadCurrentIntervention());

  getInterventionById(int_id)
    .then((res) => {
      const intervention = res.data;
      if (intervention.state === 'canceled') {
        alert("Le client a annulé sa demande d'intervention.");
        dispatch(unsetCurrent());
        return;
      }

      const socket = Socket.getInstance();
      socket.sync(intervention._id);
      socket.addEvents(responses);

      dispatch({
        type: STOP_LOADING,
      });
    })
    .catch((err) => {
      const message = err.response.data || err.message;
      console.log(message);
      dispatch({
        type: STOP_LOADING,
      });
    });
};
