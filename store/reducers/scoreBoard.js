import { SET_SCOREBOARD, CLEAR_SCOREBOARD } from "../actions/scoreBoard";

const initialState = {
  scoreBoardData: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCOREBOARD:
      return {
        scoreBoardData: action.scoreBoardData
      };
    default:
      return state;
  }
};
