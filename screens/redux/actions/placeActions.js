 import * as FileSystem from 'expo-file-system';
 import { insertPlace, fetchPlaces } from '../../../storageHelpers/db';

 export const ADD_PLACE = 'ADD_PLACE';
 export const DELETE_PLACE = 'DELETE_PLACE';
 export const FETCH_PLACES = 'FETCH_PLACES';



 export const fetchPlacesData = ()=> {
    return async dispatch => {
        try{
           const dbResult = await fetchPlaces();
           console.log(dbResult);
           dispatch({type: FETCH_PLACES, places: dbResult.rows._array});
        }catch (err){
            throw err;
        }
      
    };
 }

 export const addPlace = (title, image)=>{
    return async dispatch=>{
        const imageName = image.split('/').pop();
        const imagePath = FileSystem.documentDirectory + imageName;
        try{

            await FileSystem.moveAsync({
                from: image,
                to: imagePath
            });
        
            const dbInsert = await insertPlace(title, imagePath, '111 Address St', 15.0, 22.0);

            console.log(dbInsert);

            dispatch({
                type: ADD_PLACE,
                data:{
                    id: dbInsert.insertId,
                    title,
                    image: imagePath
                }
            });

        }catch(err){

            console.log(err);
            throw err;

        }

    }

 }

 export const deletePlace = ()=>{
    return {
        type: DELETE_PLACE
    }
}
