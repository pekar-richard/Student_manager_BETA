import axios from "axios";
import { GET_LOGOUT, GET_USER, GET_LOGIN, GET_ERRORS } from "./types";
import { API_ENDPOINT } from "../config";

export const getAusloggen = (history) => async (dispatch) => {
  axios.defaults.withCredentials = true;
  const res = await axios.get(`${API_ENDPOINT}/api/logout`);
  history.push("/Login");
  dispatch({
    type: GET_LOGOUT,
    payload: res.data,
  });
  dispatch({
    type: GET_USER,
    payload: "null",
  });
};

export const getUser = () => async (dispatch) => {
  axios.defaults.withCredentials = true;
  const res = await axios.get(`${API_ENDPOINT}/api/getuser`);
  dispatch({
    type: GET_USER,
    payload: res.data,
  });
};

export const getLogin = (userlogin, history) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.post(`${API_ENDPOINT}/api/login`, userlogin);
    console.log(res.data);
    if (res.data === "true" || res.data === true) {
      dispatch({
        type: GET_ERRORS,
        payload: "true",
      });
    } else {
      dispatch({
        type: GET_LOGIN,
        payload: res.data,
      });

      dispatch({
        type: GET_USER,
        payload: res.data,
      });
      history.push(`/dashboard`);
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
