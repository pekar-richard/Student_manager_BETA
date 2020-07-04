import axios from "axios";
import {
  GET_ERRORS,
  GET_RECHNUNG,
  GET_RECHNUNGS,
  DELETE_RECHNUNG,
} from "./types";
import { API_ENDPOINT } from "../config";

export const createRechnung = (rechnung, history) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    await axios.post(`${API_ENDPOINT}/api/rechnung/`, rechnung);
    history.push("/RechnungDashboard");
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

export const updateRechnung = (rechnung, id, history) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.put(`${API_ENDPOINT}/api/rechnung/${id}`, rechnung);
    history.push("/RechnungDashboard");
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

export const getRechnungs = () => async (dispatch) => {
  axios.defaults.withCredentials = true;
  const res = await axios.get(`${API_ENDPOINT}/api/rechnung/allrechnungs`);
  dispatch({
    type: GET_RECHNUNGS,
    payload: res.data,
  });
};

export const getRechnung = (id, history) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.get(`${API_ENDPOINT}/api/rechnung/${id}`);

    dispatch({
      type: GET_RECHNUNG,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteRechnung = (id) => async (dispatch) => {
  axios.defaults.withCredentials = true;
  await axios.delete(`${API_ENDPOINT}/api/rechnung/${id}`);
  dispatch({
    type: DELETE_RECHNUNG,
    payload: id,
  });
};
