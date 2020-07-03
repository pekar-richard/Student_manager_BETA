import axios from "axios";
import { GET_LOGOUT, GET_USER } from "./types";

export const getAusloggen = (history) => async (dispatch) => {
  const res = await axios.get("/api/logout");
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
  const res = await axios.get("api/getuser");
  dispatch({
    type: GET_USER,
    payload: res.data,
  });
};
