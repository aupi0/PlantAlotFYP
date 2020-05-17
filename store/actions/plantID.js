import { AsyncStorage } from "react-native";

import Plant from "../../models/plant";

export const SET_PLANTS = "SET_PLANTS";
export const LOGOUT = "LOGOUT";

export const identifyPlant = (image, latitude, longitude, userId) => {
  console.log();
  return async () => {
    const userData = await AsyncStorage.getItem("userData");
    const jsonUserData = JSON.parse(userData);
    console.log(image.base64.substring(0, 100));
    try {
      const response = await fetch(
        "http://api.sherlock.uk:5000/identify_plant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jsonUserData.token,
          },
          body: JSON.stringify({
            image: image.base64,
            latitude: latitude,
            longitude: longitude,
          }),
        }
      );

      if (!response.ok) {
        console.log(response.status);
        const errorResData = await response.json();
        console.log(errorResData);
        throw new Error("Something went Wrong!");
      }

      const resData = await response.json();
      console.log(resData);

      timeWaste = async () => {
        return new Promise((resolve) =>
          setTimeout(() => {
            resolve("result");
          }, 5000)
        );
      };

      const timeWasteData = await this.timeWaste();

      if (timeWasteData !== null) {
        if (resData.suggestions.length < 1) {
          console.log("error: 0 suggestions");
        } else {
          await savePlantToDatabase(
            userId,
            resData.id,
            resData.suggestions[0].plant.name,
            resData.images[0].url,
            resData.latitude,
            resData.longitude,
            resData.suggestions[0].plant.url,
            resData.sent,
            resData.suggestions[0].plant.common_name,
            resData.suggestions[0].probability
          );
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

const savePlantToDatabase = async (
  userId,
  plantId,
  plantName,
  imageUrl,
  latitude,
  longitude,
  plantInfoUrl,
  dateTimeFound,
  commonName,
  probability
) => {
  console.log("inside savePlant to Database with userId: " + userId);
  const userData = await AsyncStorage.getItem("userData");
  const jsonUserData = JSON.parse(userData);

  console.log("plantId = " + plantId);
  console.log("plantName = " + plantName);
  console.log("imageUrl = " + imageUrl);
  console.log("latitude = " + latitude);
  console.log("longitude = " + longitude);
  console.log("plantInfoUrl = " + plantInfoUrl);
  console.log("commonName = " + commonName);
  console.log("probability = " + probability);
  try {
    console.log("inside savePlantToDatabase");
    const date = new Date(dateTimeFound * 1000);
    const dateFormatted = date.toISOString().slice(0, 19).replace("T", " ");
    console.log("dateTimeFOund = " + dateFormatted);
    const response = await fetch("http://api.sherlock.uk:5000/add_plant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jsonUserData.token,
      },
      body: JSON.stringify({
        userId: userId.toString(),
        plantId: plantId.toString(),
        plantName: plantName.toString(),
        imageUrl: imageUrl.toString(),
        latitude: latitude,
        longitude: longitude,
        plantInfoUrl: plantInfoUrl.toString(),
        dateTimeFound: dateFormatted.toString(),
        commonName: commonName.toString(),
        probability: probability,
      }),
    });

    if (!response.ok) {
      let message = "Something went wrong!";
      if (response.status == 500) {
        const errorResData = await response.text();
        console.log(errorResData);
        message = "Internal Server Error";
      } else if (response.status == 400) {
        const errorResData = await response.json();
        console.log(errorResData);
        message = errorResData.msg;
      } else {
        const errorResData = await response.json();
        console.log(errorResData);
        const errorId = errorResData.msg;
        if (errorId === "User doesn't exist") {
          message = errorId;
        }
      }
      throw new Error(message);
    }
    const resData = await response.json();
    console.log(resData);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserPlants = () => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    const jsonUserData = JSON.parse(userData);
    try {
      const response = await fetch(
        "http://api.sherlock.uk:5000/get_user_plants",
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
      const userPlants = [];

      for (const key in resData) {
        userPlants.push(
          new Plant(
            resData[key].plantId,
            resData[key].userId,
            resData[key].plantName,
            resData[key].imageUrl,
            resData[key].latitude,
            resData[key].longitude,
            resData[key].plantInfoUrl,
            resData[key].dateTimeFound,
            resData[key].commonName,
            resData[key].probability,
            resData[key].points
          )
        );
      }

      dispatch({
        type: SET_PLANTS,
        userPlants: userPlants.reverse(),
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
};
