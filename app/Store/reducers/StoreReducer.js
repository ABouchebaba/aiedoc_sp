import {
  GET_PRODUCTS,
  GET_CATEGORIES,
  STORE_LOADING_CATEGORIES,
  STORE_LOADING_PRODUCTS,
  ERROR_STORE,
} from "../../constants/ActionTypes";

const initialState = {
  products: [],
  categories: [],
  loadingCat: false,
  loadingProd: false,
  error: false,
};

const StoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        products: action.data,
        loadingProd: false,
        error: false,
      };
    }

    case GET_CATEGORIES: {
      return {
        ...state,
        categories: action.data,
        loadingCat: false,
        error: false,
      };
    }

    case ERROR_STORE: {
      return {
        ...state,
        error: action.data,
        loading: false,
      };
    }

    case STORE_LOADING_PRODUCTS: {
      return {
        ...state,
        loadingProd: true,
      };
    }
    case STORE_LOADING_CATEGORIES: {
      return {
        ...state,
        loadingCat: true,
      };
    }
    default:
      return state;
  }
};

export default StoreReducer;
