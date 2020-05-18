import { SET_SCOREBOARD, LOGOUT } from "../actions/scoreBoard";

const initialState = {
  scoreBoardData: [],
  points: null,
  position: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCOREBOARD:
      return {
        scoreBoardData: action.scoreBoardData,
        points: action.points,
        position: action.position,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
