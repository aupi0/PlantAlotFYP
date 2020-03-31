import { AsyncStorage } from "react-native";

export const IDENTIFY_PLANT = "IDENTIFY_PLANT";
export const STORE_IDENTIFICATION = "STORE_IDENTIFICATION";
export const ADD_PLANT = "ADD_PLANT";

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
    //const key = "16NJBlZVhom9201TsHZyUO3xy1qPouj80EvHQlc53klIM2tYu1";
    const key = "FAKEKEY";
    try {
      const response = await fetch("https://api.plant.id/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          key: key,
          images: [image64.base64],
          latitude: latitude,
          longitude: longitude
        })
      });

      if (!response.ok) {
        console.log(response.status);
        const errorResData = await response.json();
        console.log(errorResData);
        throw new Error("Something went Wrong!");
      }

      const resData = await response.json();
      console.log(resData);

      AsyncStorage.setItem(
        "plantData",
        JSON.stringify({
          id: resData.id,
          imageUrl: resData.images[0].url,
          userId: userId
        })
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const checkIdentification = (imageUrl, id, userId) => {
  const fakeInput = [
    {
      "callback_url": null,
      "classified": 1581384879.597418,
      "countable": true,
      "created": 1581384877.476392,
      "custom_id": null,
      "custom_url": null,
      "fail_cause": null,
      "feedback": null,
      "id": 978307,
      "images": [
        {
          "file_name": "89c24ba8f0fd47068c2d19f275519302.jpg",
          "url": "https://storage.googleapis.com/plant_id_images/production/89c24ba8f0fd47068c2d19f275519302.jpg",
          "url_small": "https://storage.googleapis.com/plant_id_images/production/89c24ba8f0fd47068c2d19f275519302_small.jpg",
          "url_tiny": "https://storage.googleapis.com/plant_id_images/production/89c24ba8f0fd47068c2d19f275519302_tiny.jpg",
        },
      ],
      "latitude": 10,
      "longitude": 20,
      "parameters": [],
      "secret": "QdXmOJ7QJP9cGtl",
      "sent": 1581384878,
      "source": "P17204157@my365.dmu.ac.uk",
      "suggestions": [
        {
          "confidence": 0.8220353657648463,
          "confirmed": false,
          "id": 6020498,
          "plant": {
            "common_name": "Bird of paradise flower, Bird of paradise flower / plant, Crane flower",
            "name": "Strelitzia",
            "url": "http://en.wikipedia.org/wiki/Strelitzia",
          },
          "probability": 0.30780536216834486,
          "similar_images": null,
        },
        {
          "confidence": 0.8220353657648463,
          "confirmed": false,
          "id": 6020499,
          "plant": {
            "common_name": "Screw pine, Pandan, Screw palm",
            "name": "Pandanus",
            "url": "http://en.wikipedia.org/wiki/Pandanus",
          },
          "probability": 0.1605662343731202,
          "similar_images": null,
        },
        {
          "confidence": 0.8220353657648463,
          "confirmed": false,
          "id": 6020500,
          "plant": {
            "common_name": null,
            "name": "Dianella",
            "url": "http://en.wikipedia.org/wiki/Dianella",
          },
          "probability": 0.10535538721107604,
          "similar_images": null,
        },
        {
          "confidence": 0.8220353657648463,
          "confirmed": false,
          "id": 6020501,
          "plant": {
            "common_name": "Florist kalanchoe, Flaming katy, Christmas kalanchoe, Madagascar widow's-thrill",
            "name": "Kalanchoe blossfeldiana",
            "url": "http://en.wikipedia.org/wiki/Kalanchoe_blossfeldiana",
          },
          "probability": 0.06292565489598298,
          "similar_images": null,
        },
        {
          "confidence": 0.8220353657648463,
          "confirmed": false,
          "id": 6020502,
          "plant": {
            "common_name": null,
            "name": "Briza media",
            "url": "http://en.wikipedia.org/wiki/Briza_media",
          },
          "probability": 0.05915090128398678,
          "similar_images": null,
        },
        {
          "confidence": 0.8220353657648463,
          "confirmed": false,
          "id": 6020503,
          "plant": {
            "common_name": null,
            "name": "Ailanthus",
            "url": "http://en.wikipedia.org/wiki/Ailanthus",
          },
          "probability": 0.04322592529583839,
          "similar_images": null,
        },
        {
          "confidence": 0.8220353657648463,
          "confirmed": false,
          "id": 6020504,
          "plant": {
            "common_name": null,
            "name": "Haworthia",
            "url": "http://en.wikipedia.org/wiki/Haworthia",
          },
          "probability": 0.028610318505955436,
          "similar_images": null,
        },
        {
          "confidence": 0.8220353657648463,
          "confirmed": false,
          "id": 6020505,
          "plant": {
            "common_name": "Italian lords-and-ladies, Italian arum",
            "name": "Arum italicum",
            "url": "http://en.wikipedia.org/wiki/Arum_italicum",
          },
          "probability": 0.020479221425614848,
          "similar_images": null,
        },
        {
          "confidence": 0.8220353657648463,
          "confirmed": false,
          "id": 6020506,
          "plant": {
            "common_name": "Algerian ivy, Common ivy, English ivy, European ivy, Ivy",
            "name": "Hedera helix",
            "url": "http://en.wikipedia.org/wiki/Hedera_helix",
          },
          "probability": 0.016684972233847694,
          "similar_images": null,
        },
        {
          "confidence": 0.8220353657648463,
          "confirmed": false,
          "id": 6020507,
          "plant": {
            "common_name": "Morning glories",
            "name": "Ipomoea",
            "url": "http://en.wikipedia.org/wiki/Ipomoea",
          },
          "probability": 0.014318638204537524,
          "similar_images": null,
        },
      ],
      "week": null,
    },
  ];
  return async (dispatch) => {
    //const key = "16NJBlZVhom9201TsHZyUO3xy1qPouj80EvHQlc53klIM2tYu1";
    const key = "FAKEKEY";
    //Example input {"key":"16NJBlZVhom9201TsHZyUO3xy1qPouj80EvHQlc53klIM2tYu1","ids":[978307]}
    console.log(
      JSON.stringify({
        key: key,
        ids: [id]
      })
    );
    try {
      /*const response = await fetch(
        "https://api.plant.id/check_identifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "key": key,
            "ids": [id]
          })
        }
      );

      if (!response.ok) {
        console.log(response.status);
        const errorResData = await response.json();
        console.log(errorResData);
        throw new Error("Something went Wrong!");
      }

      const resData = await response.json();*/
      resData = fakeInput;
      //savePlantToStorage(resData, userId, imageUrl)
      savePlantToDatabase(resData, userId, imageUrl)

      dispatch({
        type: ADD_PLANT,
        plantData: {
          id: resData[0].id,
          userId: userId,
          plantName: resData[0].suggestions[0].plant.name,
          imageUrl: imageUrl,
          latitude: resData[0].latitude,
          longitude: resData[0].longitude,
          plantInfoUrl: resData[0].suggestions[0].plant.url,
          dateTime: resData[0].sent,
          commonName: resData[0].suggestions[0].plant.common_name,
          probability: resData[0].suggestions[0].probability
        }
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

/*const savePlantToStorage = (resData, userId, imageUrl) => {
  AsyncStorage.setItem(
    "plantData",
    JSON.stringify({
      id: resData[0].id,
      userId: userId,
      plantName: resData[0].suggestions[0].plant.name,
      imageUrl: imageUrl,
      latitude: resData[0].latitude,
      longitude: resData[0].longitude,
      plantInfoUrl: resData[0].suggestions[0].plant.url,
      dateTime: resData[0].sent,
      commonName: resData[0].suggestions[0].plant.common_name,
      probability: resData[0].suggestions[0].probability
    })
  );
};*/

const savePlantToDatabase = (resData, userId, imageUrl) => {
  console.log("inside savePlant to Database with userId" + userId);
  return async () => {
    try {
      const response = await fetch("http://api.sherlock.uk:5000/addPlant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          id: resData[0].id,
          userId: userId,
          plantName: resData[0].suggestions[0].plant.name,
          imageUrl: imageUrl,
          latitude: resData[0].latitude,
          longitude: resData[0].longitude,
          plantInfoUrl: resData[0].suggestions[0].plant.url,
          dateTime: resData[0].sent,
          commonName: resData[0].suggestions[0].plant.common_name,
          probability: resData[0].suggestions[0].probability
        }
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
};

export const getUserPlants = () => {
  return async dispatch => {
    const response = await fetch("http://api.sherlock.uk:5000/get_user_plants", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      let message = "Something went wrong!";
      if (response.status == 500) {
        const errorResData = await response.text();
        console.log(errorResData);
        message = "Internal Server Error";
      } else {
        const errorResData = await response.json();
        console.log(errorResData);
        const errorId = errorResData.msg;
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
  };
};