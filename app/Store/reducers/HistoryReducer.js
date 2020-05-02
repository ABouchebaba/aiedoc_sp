import {
    GET_INTERVENTIONS,
    ERROR_GET_INTERVENTIONS,
    GET_INTERVENTIONS_LOADING,
    GET_COMMANDS,
    GET_COMMANDS_LOADING,
    ERROR_GET_COMMANDS
  } from "../../constants/ActionTypes";
  
  const initialState = {
      interventions: [],
      commands:[],
      loading: false,
      error: false,
  };
  
  const HistoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INTERVENTIONS: {
        return {
          ...state,
          interventions: action.data,
          loading: false,
          error: false,
        };
      }
      case ERROR_GET_INTERVENTIONS: {
        return {
          ...state,
          error: action.data,
          loading: false,
        };
      }
  
      case GET_INTERVENTIONS_LOADING: {
        return {
          ...state,
          loading: true,
        };
      }

      case GET_COMMANDS: {
        return {
          ...state,
          commands: action.data,
          loading: false,
          error: false,
        };
      }
      case ERROR_GET_COMMANDS: {
        return {
          ...state,
          error: action.data,
          loading: false,
        };
      }
  
      case GET_COMMANDS_LOADING: {
        return {
          ...state,
          loading: true,
        };
      }
      default:
        return state;
    }
  };
  
  export default HistoryReducer;
  