import { IDENTIFY_PLANT } from '../actions/plantID';

const initialState = {
    imageUrl: null,
    longitude: null,
    latitude: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case IDENTIFY_PLANT:
            return {
                imageUrl: action.imageUrl,
                longitude: action.longitude,
                latitude: action.latitude
            };
        default:
            return state;
    }
};