import {ADD_PLACE, DELETE_PLACE, FETCH_PLACES} from '../actions/placeActions';

import Place from '../../../models/placeModel';

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case FETCH_PLACES:
            return {
                places: action.places.map(place=> new Place(place.id.toString(), place.title, place.imgUri, '111 Test St', 15.3, 22.2))
            }
        case ADD_PLACE:
            const addedPlace = new Place(action.data.id.toString(), action.data.title, action.data.image, '111 Test St', 15.3, 22.2);
            return {
                places: state.places.concat(addedPlace)
            }
        case DELETE_PLACE:

            return {
                ...state
            }
        default:
            return state;
    }

   
}