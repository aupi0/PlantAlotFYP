import { IDENTIFY_PLANT, STORE_IDENTIFICATION } from "../actions/plantID";
import { ADD_PLANT, SET_PLANTS } from "../actions/plantID";
import Plant from '../../models/plant';

const initialState = {
  availablePlants: [],
  userPlants: []
  /*id: null,
  imageUrl: null,
  userId: null,
  plantName: null,
  latitude: null,
  longitude: null,
  plantInfoUrl: null,
  timeDate: null,
  commonName: null,
  probability: null*/
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IDENTIFY_PLANT:
      return {
        id: action.id,
        imageUrl: action.imageUrl,
        userId: action.userId
      };
    case STORE_IDENTIFICATION:
      return {
        id: action.id,
        userId: action.userId,
        plantName: action.plantName,
        imageUrl: action.imageUrl,
        latitude: action.latitude,
        longitude: action.longitude,
        plantInfoUrl: action.plantInfoUrl,
        timeDate: action.timeDate,
        commonName: action.commonName,
        probability: action.probability
      };
    case SET_PLANTS:
      return {
        availablePlants: action.plants,
        userPlants: action.userPlants
      };
    case ADD_PLANT:
      const newPlant = new Plant(
        action.plantData.id,
        action.plantData.userId,
        action.plantData.plantName,
        action.plantData.imageUrl,
        action.plantData.latitude,
        action.plantData.longitude,
        action.plantData.plantInfoUrl,
        action.plantData.timeDate,
        action.plantData.commonName,
        action.plantData.probability
      );
      return {
        ...state,
        availablePlants: state.availablePlants.concat(newPlant),
        userPlants: state.userPlants.concat(newPlant)
      };
    default:
      return state;
  }
};
