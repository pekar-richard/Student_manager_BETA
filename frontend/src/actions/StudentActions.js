import axios from "axios";
import { GET_ERRORS, GET_STUDENT, GET_STUDENTS, DELETE_STUDENT } from "./types";
import { API_ENDPOINT } from "../config";

export const createStudent = (student, history) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    await axios.post(`${API_ENDPOINT}/api/student/`, student);
    history.push("/dashboard");
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

export const updateStudent = (student, id, history) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.put(`${API_ENDPOINT}/api/student/${id}`, student);
    history.push("/dashboard");
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

export const getStudents = () => async (dispatch) => {
  axios.defaults.withCredentials = true;
  const res = await axios.get(`${API_ENDPOINT}/api/student/allstudents`);

  dispatch({
    type: GET_STUDENTS,
    payload: res.data,
  });
};

export const getStudent = (id, history) => async (dispatch) => {
  axios.defaults.withCredentials = true;
  try {
    const res = await axios.get(`${API_ENDPOINT}/api/student/${id}`);
    dispatch({
      type: GET_STUDENT,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  axios.defaults.withCredentials = true;
  await axios.delete(`${API_ENDPOINT}/api/student/${id}`);
  dispatch({
    type: DELETE_STUDENT,
    payload: id,
  });
};
