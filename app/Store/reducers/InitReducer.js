import { DEFAULT_ACTION } from "../../constants/ActionTypes";

const initialState = {
  loading: false,
};

const InitReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default InitReducer;
