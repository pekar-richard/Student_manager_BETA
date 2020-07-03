import { GET_LEKTIONS } from "../actions/types";
import { GET_LEKTION } from "../actions/types";
import { DELETE_LEKTION } from "../actions/types";

const initialState = {
  lektions: [],
  lektion: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEKTIONS:
      return { ...state, lektions: action.payload };
    case GET_LEKTION:
      return { ...state, lektion: action.payload };
    case DELETE_LEKTION:
      return {
        ...state,
        lektions: state.lektions.filter(
          (lektion) => lektion.lektionIndex !== action.payload
        ),
      };
    default:
      return state;
  }
}
