import { SET_SPS, SPS_LOADING, ERROR_SPS } from "../../constants/ActionTypes";

const initialState = {
  sps: [],
  loading: false,
  error: false,
};

const SpsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPS: {
      return {
        ...state,
        sps: action.data,
        loading: false,
        error: false,
      };
    }

    case ERROR_SPS: {
      return {
        ...state,
        error: action.data,
        loading: false,
      };
    }

    case SPS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default SpsReducer;
