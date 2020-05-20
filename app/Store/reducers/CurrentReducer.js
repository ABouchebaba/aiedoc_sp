import {
  LOADING_CURRENT_INTERVENTION,
  UNSET_CURRENT,
  SET_CURRENT,
  STOP_LOADING,
  SET_CURRENT_INTERVENTION,
} from '../../constants/ActionTypes';

const initialState = {
  intervention: false,
  client: false,
  loading: false,
};

const CurrentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_CURRENT_INTERVENTION: {
      return {
        ...state,
        loading: true,
      };
    }
    case STOP_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case SET_CURRENT: {
      return {
        ...state,
        intervention: action.intervention,
        client: action.client,
        loading: false,
      };
    }
    case SET_CURRENT_INTERVENTION: {
      return {
        ...state,
        intervention: action.intervention,
        loading: false,
      };
    }
    case UNSET_CURRENT: {
      return {
        ...state,
        intervention: false,
        client: false,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default CurrentReducer;
