import { GET_LOGOUT, GET_USER, GET_LOGIN } from "../actions/types";

const initialState = {
  logout: "",
  user: "null",
  login: "null",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOGOUT:
      return { ...state, logout: action.payload };
    case GET_USER:
      return { ...state, user: action.payload };
    case GET_LOGIN:
      return { ...state, login: action.payload };
    default:
      return state;
  }
}
