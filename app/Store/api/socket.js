import {
  unsetCurrent,
  setCurrent,
  setCurrentIntervention,
  setUser,
} from '../actions';
import {AppStateEvents} from '../../helpers';

export const initSocket = (dispatch, int_id) => {
  return (socket) => {
    // then join room
    socket.emit('join', int_id);

    // add app state event listener to sync on state change
    AppStateEvents.addNamedEvent('sync', 'change', (nextAppState) => {
      if (nextAppState === 'active') {
        // trigger on foreground only
        socket.sync();
      }
    });

    /// add event listeners
    socket.on('refused', (int_id) => {
      socket.destroy();
      AppStateEvents.removeNamedEvent('sync');
      dispatch(unsetCurrent());
    });

    socket.on('goWait', (intervention) =>
      dispatch(setCurrentIntervention(intervention)),
    );

    socket.on('canceled', () => {
      alert("Le client a annulé sa demande d'intervention");
      socket.destroy();
      AppStateEvents.removeNamedEvent('sync');
      dispatch(unsetCurrent());
    });

    socket.on('goFacture', (intervention) =>
      dispatch(setCurrent(intervention)),
    );

    socket.on('goReview', ({intervention, sp}) => {
      dispatch(setUser(sp));
      dispatch(setCurrent(intervention));
    });

    socket.on('goHome', () => {
      socket.destroy();
      AppStateEvents.removeNamedEvent('sync');
      dispatch(unsetCurrent());
    });
  };
};
