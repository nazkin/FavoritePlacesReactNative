 import * as FileSystem from 'expo-file-system';
 import { insertPlace, fetchPlaces } from '../../../storageHelpers/db';
 import env from '../../../env';

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

 export const addPlace = (title, image, lat, long)=>{
    return async dispatch=>{
        //reverse geocoding
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${env.apiKey}`);
        const resData = await response.json();

        if(!resData.results){
            throw new Error('Can not fetch the address of your coordinates');
        }

        const coordinateAddress = resData.results[0].formatted_address;
        const imageName = image.split('/').pop();
        const imagePath = FileSystem.documentDirectory + imageName;

        try{

            await FileSystem.moveAsync({
                from: image,
                to: imagePath
            });
        
            const dbInsert = await insertPlace(title, imagePath, coordinateAddress, lat,long);

            console.log(dbInsert);

            dispatch({
                type: ADD_PLACE,
                data:{
                    id: dbInsert.insertId,
                    title,
                    image: imagePath,
                    address: coordinateAddress,
                    latitude: lat,
                    longitude: long
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
