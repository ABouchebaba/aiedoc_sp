import {
  SET_SERVICES,
  SERVICES_LOADING,
  ERROR_SERVICES,
} from "../../constants/ActionTypes";
import { getServiceTypes } from "../api";

export const getServices = () => (dispatch) => {
  dispatch({ type: SERVICES_LOADING });

  getServiceTypes()
    .then((res) => {
      console.log("Get services - got results : " + res.data.length);
      const data  =  []
      res.data.map(x => x.services.map(y=> data.push(x.type+' -- '+ y.name)))
      // console.log(data)
      return dispatch({
        type: SET_SERVICES,
        data: data,
      });
    })
    .catch((err) => {
      console.log("Get services - got error : " + err.message);
      return dispatch({
        type: ERROR_SERVICES,
        data: err.message,
      });
    });
};
