import axios from "axios";
import { GET_LOGOUT, GET_USER, GET_LOGIN, GET_ERRORS } from "./types";
import { API_ENDPOINT } from "../config";

export const getAusloggen = (history) => async (dispatch) => {
  const res = await axios.get(`/api/logout`);
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
  const res = await fetch(API_ENDPOINT + "/api/getuser", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
  });
  const data = await res.text();
  dispatch({
    type: GET_USER,
    payload: data,
  });
};

export const getLogin = (userlogin, history) => async (dispatch) => {
  try {
    //const res = await axios.post(`/api/login`, userlogin);

    const res = await fetch(API_ENDPOINT + "/api/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(userlogin),
    });
    const data = await res.text();

    if (data === "true" || data === true) {
      dispatch({
        type: GET_ERRORS,
        payload: "true",
      });
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: "false",
      });

      dispatch({
        type: GET_LOGIN,
        payload: data,
      });

      dispatch({
        type: GET_USER,
        payload: data,
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
