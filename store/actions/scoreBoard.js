import { AsyncStorage } from "react-native";

export const SET_SCOREBOARD = "SET_SCOREBOARD";

export const getScoreBoard = () => {
    return async (dispatch) => {
      const userData = await AsyncStorage.getItem("userData");
      const jsonUserData = JSON.parse(userData);
      try {
        const response = await fetch(
          "http://api.sherlock.uk:5000/get_leader_board",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + jsonUserData.token,
            },
          }
        );
  
        if (!response.ok) {
          let message = "Something went wrong!";
          if (response.status == 500) {
            const errorResData = await response.text();
            console.log(errorResData);
            message = "Internal Server Error";
          } else {
            const errorResData = await response.json();
            console.log(errorResData);
          }
          throw new Error(message);
        }
  
        const resData = await response.json();
        console.log(resData);
  
        dispatch({
          type: SET_SCOREBOARD,
          scoreBoardData: resData,
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    };
  };