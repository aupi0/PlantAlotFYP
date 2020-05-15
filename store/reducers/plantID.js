import { SET_PLANTS, LOGOUT } from "../actions/plantID";

const initialState = {
  userPlants: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANTS:
      return {
        userPlants: action.userPlants,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
