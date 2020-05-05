import {
  UNSET_CURRENT,
  SET_CURRENT,
  LOADING_CURRENT_INTERVENTION,
} from '../../constants/ActionTypes';
import {Socket} from '../../helpers';

export const unsetCurrent = () => (dispatch) => {
  dispatch({
    type: UNSET_CURRENT,
  });
};

export const setCurrent = (intervention) => (dispatch) => {
  dispatch({
    type: SET_CURRENT,
    intervention,
  });
};
export const loadCurrentIntervention = () => (dispatch) => {
  dispatch({
    type: LOADING_CURRENT_INTERVENTION,
  });
};

export const resetCurrentIntervention = (int_id) => (dispatch) => {
  dispatch(loadCurrentIntervention());

  const socket = Socket.getInstance();
  // Cleaning socket disconnect mess
  // Overkill ...
  if (socket.isInitialized()) socket.destroy();
  socket.init();
  socket.emit('join', int_id);

  // Socket should be initialized
  // expecting to receive intervention
  // from server as resync response
  socket.on('resync', (intervention) => {
    dispatch(setCurrentIntervention(intervention));
  });
  // triggering resync
  socket.emit('resync', int_id);
};
