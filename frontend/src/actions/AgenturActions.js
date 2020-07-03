import axios from "axios";
import { GET_ERRORS, GET_AGENTUR, GET_AGENTURS, DELETE_AGENTUR } from "./types";

export const createAgentur = (agentur, history) => async (dispatch) => {
  try {
    await axios.post("/api/agentur/", agentur);
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
    const res = await axios.put(`/api/agentur/${id}`, agentur);
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
  const res = await axios.get("/api/agentur/allagenturs");
  dispatch({
    type: GET_AGENTURS,
    payload: res.data,
  });
};

export const getAgentur = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/agentur/${id}`);
    dispatch({
      type: GET_AGENTUR,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteAgentur = (id) => async (dispatch) => {
  await axios.delete(`/api/agentur/${id}`);
  dispatch({
    type: DELETE_AGENTUR,
    payload: id,
  });
};
