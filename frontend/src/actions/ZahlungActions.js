import axios from "axios";
import {
  GET_ERRORS,
  GET_ZAHLUNG,
  GET_ZAHLUNGS,
  DELETE_ZAHLUNG,
  GET_ZAHLUNGS_BYSTUDENTID,
  GET_ZAHLUNGS_BYSTUDENTIDANDAGENTUR,
} from "./types";
import { API_ENDPOINT } from "../config";

export const createZahlung = (zahlung, student_index, history) => async (
  dispatch
) => {
  try {
    axios.defaults.withCredentials = true;
    await axios.post(`${API_ENDPOINT}/api/zahlung/`, zahlung);
    history.push(`/ZahlungDashboard/${student_index}`);
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

export const updateZahlung = (zahlung, id, student_index, history) => async (
  dispatch
) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.put(`${API_ENDPOINT}/api/zahlung/${id}`, zahlung);
    history.push(`/ZahlungDashboard/${student_index}`);
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

export const getZahlungs = () => async (dispatch) => {
  axios.defaults.withCredentials = true;
  const res = await axios.get(`${API_ENDPOINT}/api/zahlung/allzahlungs`);

  dispatch({
    type: GET_ZAHLUNGS,
    payload: res.data,
  });
};

export const getZahlung = (id, history) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.get(`${API_ENDPOINT}/api/zahlung/${id}`);
    dispatch({
      type: GET_ZAHLUNG,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const getZahlungsByStudentID = (student_id, history) => async (
  dispatch
) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.get(
      `${API_ENDPOINT}/api/zahlung/student/${student_id}`
    );
    dispatch({
      type: GET_ZAHLUNGS_BYSTUDENTID,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const getZahlungsByStudentIDAndAgentur = (
  student_id,
  agentur_id,
  history
) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.get(
      `${API_ENDPOINT}/api/zahlung/${student_id}/${agentur_id}`
    );
    dispatch({
      type: GET_ZAHLUNGS_BYSTUDENTIDANDAGENTUR,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteZahlung = (id) => async (dispatch) => {
  axios.defaults.withCredentials = true;
  await axios.delete(`${API_ENDPOINT}/api/zahlung/${id}`);
  dispatch({
    type: DELETE_ZAHLUNG,
    payload: id,
  });
};
