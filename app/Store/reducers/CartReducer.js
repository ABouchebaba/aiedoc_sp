import { SET_PRODUCT, CART_LOADING, ERROR_CART } from "../../constants/ActionTypes";

const initialState = {
  cart: [],
  loading: false,
  error: false,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT: {
      return {
        ...state,
        cart: [...action.data],
        loading: false,
        error: false,
      };
    }
    case ERROR_CART: {
      return {
        ...state,
        error: action.data,
        loading: false,
      };
    }

    case CART_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default CartReducer;
