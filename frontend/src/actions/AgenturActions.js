import axios from "axios";
import { GET_ERRORS, GET_AGENTUR, GET_AGENTURS, DELETE_AGENTUR } from "./types";
import { API_ENDPOINT } from "../config";

export const createAgentur = (agentur, history) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    await axios.post(`${API_ENDPOINT}/api/agentur/`, agentur);
    history.push("/AgenturDashboard");
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

export const updateAgentur = (agentur, id, history) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.put(`${API_ENDPOINT}/api/agentur/${id}`, agentur);
    history.push(`/AgenturDashboard`);
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

export const getAgenturs = () => async (dispatch) => {
  axios.defaults.withCredentials = true;
  const res = await axios.get(`${API_ENDPOINT}/api/agentur/allagenturs`);
  dispatch({
    type: GET_AGENTURS,
    payload: res.data,
  });
};

export const getAgentur = (id, history) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.get(`${API_ENDPOINT}/api/agentur/${id}`);
    dispatch({
      type: GET_AGENTUR,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteAgentur = (id) => async (dispatch) => {
  axios.defaults.withCredentials = true;
  await axios.delete(`${API_ENDPOINT}/api/agentur/${id}`);
  dispatch({
    type: DELETE_AGENTUR,
    payload: id,
  });
};
