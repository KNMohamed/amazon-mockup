import { ORDER_CREATE_REQUEST, ORDER_CREATE_FAILED, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILED } from "../constants/orderConstants";

function orderCreateReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case ORDER_CREATE_FAILED:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function orderDetailsReducer(state = {
    order: {
      orderItems: [],
      shipping: {},
      payment: {}
    }
  }
  , action) {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAILED:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

export { orderCreateReducer, orderDetailsReducer };