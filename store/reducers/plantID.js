import { IDENTIFY_PLANT, CHECK_IDENTIFICATION } from "../actions/plantID";

const initialState = {
  id: null,
  imageUrl: null,
  userId: null,
        plantName: null,
        latitude: null,
        longitude: null,
        plantInfoUrl: null,
        time: null,
        commonName: null,
        probability: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IDENTIFY_PLANT:
      return {
        id: action.id,
        imageUrl: action.imageUrl,
        userId: action.imageUrl
      };
    case CHECK_IDENTIFICATION:
      return {
        id: action.id,
        userId: action.userId,
        plantName: action.plantName,
        imageUrl,
        latitude: action.latitude,
        longitude: resData.longitude,
        plantInfoUrl: action.plantInfoUrl,
        time: action.time,
        commonName: action.commonName,
        probability: action.probability
      };
    default:
      return state;
  }
};
