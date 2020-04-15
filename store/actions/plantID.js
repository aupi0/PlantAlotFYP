import { AsyncStorage } from "react-native";

import Plant from "../../models/plant";

export const ADD_PLANT = "ADD_PLANT";
export const SET_PLANTS = "SET_PLANTS";
export const PREP_CALLS = "PREP_CALLS";

/* exmaple response
Object {
  "callback_url": null,
  "classified": null,
  "countable": true,
  "created": 1582133865.938792,
  "custom_id": null,
  "custom_url": null,
  "fail_cause": null,
  "feedback": null,
  "id": 1025098,
  "images": Array [
    Object {
      "file_name": "763935b861214e00af6d3ce45a45ed6c.jpg",
      "url": "https://plant.id/media/images/763935b861214e00af6d3ce45a45ed6c.jpg",
      "url_small": "https://plant.id/media/images/763935b861214e00af6d3ce45a45ed6c_small.jpg",
      "url_tiny": "https://plant.id/media/images/763935b861214e00af6d3ce45a45ed6c_tiny.jpg",
    },
  ],
  "latitude": 10,
  "longitude": 20,
  "parameters": Array [],
  "secret": "i3tvwNFKlvgoelA",
  "sent": null,
  "source": "P17204157@my365.dmu.ac.uk",
  "suggestions": Array [],
  "week": null,
}*/
export const identifyPlant = (image64, latitude, longitude, userId) => {
  return async () => {
    const key = "16NJBlZVhom9201TsHZyUO3xy1qPouj80EvHQlc53klIM2tYu1";
    //const key = "FAKEKEY";
    try {
      const response = await fetch("https://api.plant.id/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: key,
          images: [image64.base64],
          latitude: latitude,
          longitude: longitude,
        }),
      });

      if (!response.ok) {
        console.log(response.status);
        const errorResData = await response.json();
        console.log(errorResData);
        throw new Error("Something went Wrong!");
      }

      const resData = await response.json();
      console.log(resData);

      timeWaste = async() => {
        return new Promise((resolve) =>
          setTimeout(
            () => { resolve('result') },
            7000
          )
        );
      }

      const timeWasteData = await this.timeWaste();

      if (timeWasteData !== null) {
        await checkIdentification(resData.images[0].url, resData.id, userId);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

const checkIdentification = async (imageUrl, plantId, userId) => {
  const key = "16NJBlZVhom9201TsHZyUO3xy1qPouj80EvHQlc53klIM2tYu1";
  //const key = "FAKEKEY";
  try {
    const response = await fetch("https://api.plant.id/check_identifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: key,
        ids: [plantId],
      }),
    });

    if (!response.ok) {
      console.log(response.status);
      const errorResData = await response.json();
      console.log(errorResData);
      throw new Error("Something went Wrong!");
    }

    const resData = await response.json();
    console.log(resData);

    await savePlantToDatabase(
      userId,
      resData[0].id,
      resData[0].suggestions[0].plant.name,
      imageUrl,
      resData[0].latitude,
      resData[0].longitude,
      resData[0].suggestions[0].plant.url,
      resData[0].sent,
      resData[0].suggestions[0].plant.common_name,
      resData[0].suggestions[0].probability
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
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
  try {
    //temp
    dateTimeFound = "2020-04-08 23:59:00"
    const response = await fetch("http://api.sherlock.uk:5000/add_plant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        userId: userId,
        plantId: plantId,
        plantName: plantName,
        imageUrl: imageUrl,
        latitude: latitude,
        longitude: longitude,
        plantInfoUrl: plantInfoUrl,
        dateTimeFound: dateTimeFound,
        commonName: commonName,
        probability: probability,
        points: 20,
      },
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
        //maybe remove plants and loadedPlants
        plants: [],
        userPlants: userPlants,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
