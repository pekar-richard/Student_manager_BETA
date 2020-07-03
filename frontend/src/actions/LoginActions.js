import axios from "axios";
import { GET_LOGOUT, GET_USER } from "./types";
import { API_ENDPOINT } from "../config";

export const getAusloggen = (history) => async (dispatch) => {
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
  const res = await axios.get(`${API_ENDPOINT}/api/getuser`);
  dispatch({
    type: GET_USER,
    payload: res.data,
  });
};
