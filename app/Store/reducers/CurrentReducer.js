import {
  LOADING_CURRENT_INTERVENTION,
  UNSET_CURRENT,
  SET_CURRENT,
} from '../../constants/ActionTypes';

const initialState = {
  intervention: false,
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
    case SET_CURRENT: {
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
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default CurrentReducer;
