import { IDENTIFY_PLANT, STORE_IDENTIFICATION } from "../actions/plantID";
import { PREP_CALLS, ADD_PLANT, SET_PLANTS } from "../actions/plantID";
import Plant from '../../models/plant';

const initialState = {
  availablePlants: [],
  userPlants: [],
  imageUrl: "",
  plantId: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PREP_CALLS:
      return {
        imageUrl: action.imageUrl,
        plantId: action.plantId
      }
    case SET_PLANTS:
      return {
        availablePlants: action.plants,
        userPlants: action.userPlants
      };
    case ADD_PLANT:
      const newPlant = new Plant(
        action.plantData.plantId,
        action.plantData.userId,
        action.plantData.plantName,
        action.plantData.imageUrl,
        action.plantData.latitude,
        action.plantData.longitude,
        action.plantData.plantInfoUrl,
        action.plantData.dateTimeFound,
        action.plantData.commonName,
        action.plantData.probability,
        action.plantData.points
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
