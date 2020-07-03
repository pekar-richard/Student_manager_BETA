import { GET_AGENTURS } from "../actions/types";
import { GET_AGENTUR } from "../actions/types";
import { DELETE_AGENTUR } from "../actions/types";

const initialState = {
  agenturs: [],
  agentur: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AGENTURS:
      return { ...state, agenturs: action.payload };
    case GET_AGENTUR:
      return { ...state, agentur: action.payload };
    case DELETE_AGENTUR:
      return {
        ...state,
        agenturs: state.agenturs.filter(
          (agentur) => agentur.agenturIndex !== action.payload
        ),
      };
    default:
      return state;
  }
}
