import { ORDER_CREATE_REQUEST, ORDER_CREATE_FAILED, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILED } from "../constants/orderConstants";
import axios from 'axios';

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const { userSignIn: { userInfo } } = getState();
    const { data: { data: newOrder } } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: ' Bearer ' + userInfo.token
      }
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAILED, payload: error.message });
  }
}

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { userSignIn: { userInfo } } = getState();
    const { data } = await axios.get("/api/orders/" + orderId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: ORDER_DETAILS_FAILED, payload: error.message});
  }
}

export { createOrder, detailsOrder};