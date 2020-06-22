import axios from 'axios';
import Cookie from 'js-cookie';
import { USER_SIGN_IN_REQUEST, USER_SIGN_IN_SUCCESS, USER_SIGN_IN_FAILED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILED } from '../constants/userConstants';

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGN_IN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGN_IN_SUCCESS, payload: { data } });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGN_IN_FAILED, payload: error.message });
  }
}

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await axios.post("/api/users/register", {name, email, password});
    dispatch({type: USER_REGISTER_SUCCESS, payload: {data}});
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAILED, payload: error.message });
  }
}

export { signin, register };