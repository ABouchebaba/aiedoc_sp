import { DEFAULT_ACTION } from "../../constants/ActionTypes";

export const init = () => (dispatch) => {
  return dispatch({
    type: DEFAULT_ACTION,
  });
};
