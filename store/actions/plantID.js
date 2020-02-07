export const IDENTIFY_PLANT = "IDENTIFY_PLANT";

export const identifyPlant = (imageUrl, latitude, longitude) => {
  return async (dispatch, getState) => {
    //const token = getState().auth.token;
    //const userId = getState().auth.userId;
    const key = "16NJBlZVhom9201TsHZyUO3xy1qPouj80EvHQlc53klIM2tYu1";
    const response = await fetch("https://api.plant.id/identify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key,
        imageUrl,
        latitude,
        longitude
      })
    });

    const resData = await response.json();

    dispatch({
      type: IDENTIFY_PLANT,
      plantData: {
        id: resData.name,
        imageUrl,
        infoUrl: resData.url,
        name: resData.common_name,
        confidence: resData.confidence,
        confirmed: resData.confirmed,
        longitude,
        latitude
      }
    });
  };
};
