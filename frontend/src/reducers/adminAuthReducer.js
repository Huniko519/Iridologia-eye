import { SET_CURRENT_ADMIN, ADMIN_LOADING } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAdminAuthenticated: false,
  admin: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ADMIN:
      return {
        ...state,
        isAdminAuthenticated: !isEmpty(action.payload),
        admin: action.payload
      };
    case ADMIN_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
