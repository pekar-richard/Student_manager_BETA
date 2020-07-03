import axios from "axios";
import { GET_ERRORS, GET_STUDENT, GET_STUDENTS, DELETE_STUDENT } from "./types";

export const createStudent = (student, history) => async (dispatch) => {
  try {
    await axios.post("/api/student/", student);
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
    const res = await axios.put(`/api/student/${id}`, student);
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
  const res = await axios.get(`/api/student/allstudents`);

  dispatch({
    type: GET_STUDENTS,
    payload: res.data,
  });
};

export const getStudent = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/student/${id}`);
    dispatch({
      type: GET_STUDENT,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  await axios.delete(`/api/student/${id}`);
  dispatch({
    type: DELETE_STUDENT,
    payload: id,
  });
};
