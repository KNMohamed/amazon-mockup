import axios from 'axios';
import Cookie from 'js-cookie'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT} from '../constants/cartConstants';

const addToCart = (productID, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${productID}`);
    dispatch({ type: CART_ADD_ITEM, payload: { ...data, qty } });

    const {cart : {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));

  } catch (error) {
  }
}

const removeFromCart = (productID) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_REMOVE_ITEM, payload: productID});

    const {cart:{cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {

  }
}

const saveShipping = (data) => async (dispatch, getState) => {
    dispatch({type: CART_SAVE_SHIPPING, payload: data});
    const {cart:{shipping}} = getState();
    Cookie.set("shipping", JSON.stringify(shipping));
}

const savePayment = (data) => async (dispatch, getState) => {
    dispatch({type: CART_SAVE_PAYMENT, payload: data});
    const {cart:{payment}} = getState();
    Cookie.set("payment", JSON.stringify(payment));
}

export { addToCart, removeFromCart, saveShipping, savePayment };