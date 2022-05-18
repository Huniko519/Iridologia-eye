import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import patientReducer from "./patientReducer";
import translatorReducer from "./translatorReducer";
import adminAuthReducer from "./adminAuthReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  patient: patientReducer,
  translator: translatorReducer,
  adminAuth: adminAuthReducer
});
