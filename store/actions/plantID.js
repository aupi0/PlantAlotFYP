export const IDENTIFY_PLANT = "IDENTIFY_PLANT";
export const CHECK_IDENTIFICATION = "CHECK_IDENTIFICATION";

export const identifyPlant = (image64, latitude, longitude, userId) => {
  return async (dispatch, getState) => {
    //const token = getState().auth.token;
    //const userId = getState().auth.userId;
    const key = "16NJBlZVhom9201TsHZyUO3xy1qPouj80EvHQlc53klIM2tYu1";
    key = "FAKEKEY";
    try {
      const response = await fetch("https://api.plant.id/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          key,
          image64,
          latitude,
          longitude
        })
      });

      if (!response.ok) {
        throw new Error("Something went Wrong!");
      }

      const resData = await response.json();
      console.log(resData);

      dispatch({
        type: IDENTIFY_PLANT,
        plantData: {
          id: resData.id,
          imageUrl: imageUrl,
          userId: userId
        }
      });
    } catch (err) {
      throw err;
    }
  };
};

export const checkIdentification = (imageUrl, id, userId) => {
  return async (dispatch, getState) => {
    //const token = getState().auth.token;
    //const userId = getState().auth.userId;
    const key = "16NJBlZVhom9201TsHZyUO3xy1qPouj80EvHQlc53klIM2tYu1";
    key = "FAKEKEY";
    const response = await fetch("https://api.plant.id/check_identifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key: Key,
        ids: id
      })
    });

    if (!response.ok) {
      let message = "Something went wrong!";
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: CHECK_IDENTIFICATION,
      plantData: {
        id: resData.id,
        userId: userId,
        plantName: resData.plant.name,
        imageUrl: imageUrl,
        latitude: resData.latitude,
        longitude: resData.longitude,
        plantInfoUrl: resData.plant.url,
        time: resData.sent,
        commonName: resData.plant.common_name,
        probability: resData.probability
      }
    });
  };
};
