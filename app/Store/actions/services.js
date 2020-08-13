import {
  SET_SERVICES,
  SERVICES_LOADING,
  ERROR_SERVICES,
} from '../../constants/ActionTypes';
import {getServices as getServicesApi} from '../api';

export const getServices = () => (dispatch) => {
  dispatch({type: SERVICES_LOADING});

  getServicesApi()
    .then((res) => {
      console.log('Get services - got results : ' + res.data.length);
      return dispatch({
        type: SET_SERVICES,
        data: res.data,
      });
    })
    .catch((err) => {
      // console.log('Get services - got error : ' + err.message);
      return dispatch({
        type: ERROR_SERVICES,
        data: err.message,
      });
    });
};
