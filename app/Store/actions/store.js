import {
  GET_PRODUCTS,
  GET_CATEGORIES,
  ERROR_STORE,
  STORE_LOADING_CATEGORIES,
  STORE_LOADING_PRODUCTS,
} from "../../constants/ActionTypes";

import { products, categories } from "../api";

export const getProducts = () => (dispatch) => {
  dispatch({ type: STORE_LOADING_PRODUCTS });
  products()
    .then((res) => {
      console.log("Get product - got results : " + res.data.length);
      return dispatch({
        type: GET_PRODUCTS,
        data: res.data,
      });
    })
    .catch((err) => {
      console.log("Get product - got error : " + err.message);
      return dispatch({
        type: ERROR_STORE,
        data: err.message,
      });
    });
};

export const getCategories = () => (dispatch) => {
    dispatch({ type: STORE_LOADING_CATEGORIES });
    categories()
      .then((res) => {
        console.log("Get Categories - got results : " + res.data.length);
        return dispatch({
          type: GET_CATEGORIES,
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("Get Categories - got error : " + err.message);
        return dispatch({
          type: ERROR_STORE,
          data: err.message,
        });
      });
  };
