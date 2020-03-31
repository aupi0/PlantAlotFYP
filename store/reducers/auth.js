import { AUTHENTICATE, LOGOUT } from "../actions/auth";
import Name from "../../models/name";

const initialState = {
  name: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        name: action.name
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};