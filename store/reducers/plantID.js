import { SET_PLANTS } from "../actions/plantID";

const initialState = {
  userPlants: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANTS:
      return {
        userPlants: action.userPlants
      };
    default:
      return state;
  }
};
