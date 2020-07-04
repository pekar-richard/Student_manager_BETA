import axios from "axios";
import { GET_ERRORS, GET_LEKTION, GET_LEKTIONS, DELETE_LEKTION } from "./types";
import { API_ENDPOINT } from "../config";

export const createLektion = (lektion, student_index, history) => async (
  dispatch
) => {
  try {
    axios.defaults.withCredentials = true;
    await axios.post(`${API_ENDPOINT}/api/lektion/`, lektion);
    history.push(`/LektionDashboard/${student_index}`);
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const updateLektion = (lektion, id, student_index, history) => async (
  dispatch
) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.put(`${API_ENDPOINT}/api/lektion/${id}`, lektion);
    history.push(`/LektionDashboard/${student_index}`);
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getLektions = () => async (dispatch) => {
  axios.defaults.withCredentials = true;
  const res = await axios.get(`${API_ENDPOINT}/api/lektion/alllektions`);

  dispatch({
    type: GET_LEKTIONS,
    payload: res.data,
  });
};

export const getLektion = (id, history) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.get(`${API_ENDPOINT}/api/lektion/${id}`);

    dispatch({
      type: GET_LEKTION,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteLektion = (id) => async (dispatch) => {
  axios.defaults.withCredentials = true;
  await axios.delete(`${API_ENDPOINT}/api/lektion/${id}`);
  dispatch({
    type: DELETE_LEKTION,
    payload: id,
  });
};
