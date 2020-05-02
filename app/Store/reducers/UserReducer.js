import {
  USER_LOADING,
  SET_USER,
  SET_USER_STATE,
  SET_LOCATION,
  UNSET_USER,
  ERROR_USER,
} from "../../constants/ActionTypes";

const initialState = {
  user: false,
  token: false,
  location: { latitude: 36.7538, longitude: 3.058 },
  loading: false,
  error: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.data,
        token: action.token,
        loading: false,
        error: false,
      };
    }
    case SET_USER_STATE: {
      let user = { ...state.user, state: action.data };
      return { ...state, user, loading: false, error: false };
    }
    case SET_LOCATION: {
      return {
        ...state,
        location: action.data,
        loading: false,
        error: false,
      };
    }
    case UNSET_USER: {
      return {
        ...state,
        user: false,
        token: false,
        loading: false,
        error: false,
      };
    }
    case ERROR_USER: {
      return {
        ...state,
        error: action.data,
      };
    }

    default:
      return state;
  }
};

export default UserReducer;
