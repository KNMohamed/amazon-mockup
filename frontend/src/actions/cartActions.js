import axios from 'axios';
import Cookie from 'js-cookie'
import { CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants';

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

export { addToCart, removeFromCart };