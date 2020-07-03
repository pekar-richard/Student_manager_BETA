import { GET_RECHNUNGS } from "../actions/types";
import { GET_RECHNUNG } from "../actions/types";
import { DELETE_RECHNUNG } from "../actions/types";

const initialState = {
  rechnungs: [],
  rechnung: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RECHNUNGS:
      return { ...state, rechnungs: action.payload };
    case GET_RECHNUNG:
      return { ...state, rechnung: action.payload };
    case DELETE_RECHNUNG:
      return {
        ...state,
        rechnungs: state.rechnungs.filter(
          (rechnung) => rechnung.rechnIndex !== action.payload
        ),
      };
    default:
      return state;
  }
}
