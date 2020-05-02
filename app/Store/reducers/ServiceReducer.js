import {
  SET_SERVICES,
  SERVICES_LOADING,
  ERROR_SERVICES,
} from "../../constants/ActionTypes";

const initialState = {
  services: [],
  loading: false,
  error: false,
};

const ServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERVICES: {
      return {
        ...state,
        services: action.data,
        loading: false,
        error: false,
      };
    }

    case ERROR_SERVICES: {
      return {
        ...state,
        error: action.data,
        loading: false,
      };
    }

    case SERVICES_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default ServiceReducer;
