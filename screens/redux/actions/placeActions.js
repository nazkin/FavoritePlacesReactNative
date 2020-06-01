 export const ADD_PLACE = 'ADD_PLACE';
 export const DELETE_PLACE = 'DELETE_PLACE';

 export const addPlace = (title)=>{
     return {
         type: ADD_PLACE,
         data:{
             title
         }
     }
 }

 export const deletePlace = ()=>{
    return {
        type: DELETE_PLACE
    }
}
