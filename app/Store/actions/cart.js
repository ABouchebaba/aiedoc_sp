import {SET_PRODUCT,CART_LOADING, ERROR_CART} from "../../constants/ActionTypes";
import {setCommand} from "../api";

import _ from "lodash";

export const addToCart = (product, cart) => (dispatch) => {
  if (cart.length === 0) {
    cart.push(product);
    console.log("add new product: ", product.product_id);
    return dispatch({
      type: SET_PRODUCT,
      data: cart,
    });
  } else {
    let prod = _.find(cart, {product_id: product.product_id, option: product.option  });
    if (_.isUndefined(prod)) {
      cart.push(product);
      console.log("add new product: ", product.name);
      return dispatch({
        type: SET_PRODUCT,
        data: cart,
      });
    } else {
      return dispatch(addQuantity(product.product_id,product.option, cart));
    }
  }
};

export const addQuantity = (id,option, cart) => (dispatch) => {
  console.log("add quantity for: ", id, option);
  let newCart = cart.map((product) => {
    // console.log(product)
    if (product.product_id === id && product.option === option) {
      product.qty = product.qty + 1;
    }
    return product;
  });
  return dispatch({
    type: SET_PRODUCT,
    data: newCart,
  });
};

export const removeQuantity = (id, option, cart) => (dispatch) => {
  console.log("remove quantity for: ", id, option);
  let newCart = cart.map((product) => {
    if (product.product_id === id && product.option === option) {
      product.qty = product.qty - 1;
    }
    return product;
  });
  return dispatch({
    type: SET_PRODUCT,
    data: newCart,
  });
};

export const removeProduct = (id, option, cart) => (dispatch) => {
  if (cart.length > 0) {
    console.log("remove product:", id);
    let newCart = cart.filter((product) => {
      if (product.product_id !== id || product.option !== option) {
        return product;
      }
    });
    return dispatch({
      type: SET_PRODUCT,
      data: newCart,
    });
  } else {
    console.log("there is no product", cart.length);
  }
};

export const addCommand = (data, doneModal) => (dispatch) => {
  dispatch({type: CART_LOADING })
  setCommand(data)
    .then((res) => {
      // console.log(res)
      dispatch({
        type: SET_PRODUCT,
        data: [],
      });
      doneModal()
    })
    .catch((err) => {
      alert("Veuillez vérifier votre connexion internet");
      console.log(err.message);
      dispatch({
        type: ERROR_CART,
        data: err.message,
      });
    });
};
