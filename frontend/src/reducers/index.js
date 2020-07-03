import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import studentReducer from "./studentReducer";
import agenturReducer from "./agenturReducer";
import lektionReducer from "./lektionReducer";
import zahlungReducer from "./zahlungReducer";
import rechnungReducer from "./rechnungReducer";
import loginReducer from "./loginReducer";

export default combineReducers({
  errors: errorReducer,
  login: loginReducer,
  student: studentReducer,
  agentur: agenturReducer,
  lektion: lektionReducer,
  zahlung: zahlungReducer,
  rechnung: rechnungReducer,
});
