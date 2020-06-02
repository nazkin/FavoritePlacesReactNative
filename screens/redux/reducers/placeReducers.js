import {ADD_PLACE, DELETE_PLACE} from '../actions/placeActions';

import Place from '../../../models/placeModel';

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_PLACE:
            const addedPlace = new Place(new Date().toString(), action.data.title, action.data.image);
   
        
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