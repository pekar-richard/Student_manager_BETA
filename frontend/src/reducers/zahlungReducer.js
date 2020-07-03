import { GET_ZAHLUNGS } from "../actions/types";
import { GET_ZAHLUNG } from "../actions/types";
import { DELETE_ZAHLUNG } from "../actions/types";
import { GET_ZAHLUNGS_BYSTUDENTID } from "../actions/types";
import { GET_ZAHLUNGS_BYSTUDENTIDANDAGENTUR } from "../actions/types";

const initialState = {
  zahlungs: [],
  zahlung: {},
  zahlungsByStudentID: [],
  zahlungsByStudentIDAndAgentur: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ZAHLUNGS:
      return { ...state, zahlungs: action.payload };
    case GET_ZAHLUNGS_BYSTUDENTID:
      return { ...state, zahlungsByStudentID: action.payload };
    case GET_ZAHLUNG:
      return { ...state, zahlung: action.payload };
    case GET_ZAHLUNGS_BYSTUDENTIDANDAGENTUR:
      return { ...state, zahlungsByStudentIDAndAgentur: action.payload };
    case DELETE_ZAHLUNG:
      return {
        ...state,
        zahlungsByStudentIDAndAgentur: state.zahlungsByStudentIDAndAgentur.filter(
          (zahlung) => zahlung.zahlungIndex !== action.payload
        ),
      };
    default:
      return state;
  }
}
