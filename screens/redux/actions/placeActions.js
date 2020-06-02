 import * as FileSystem from 'expo-file-system';

 export const ADD_PLACE = 'ADD_PLACE';
 export const DELETE_PLACE = 'DELETE_PLACE';

 export const addPlace = (title, image)=>{
    return async dispatch=>{
        const imageName = image.split('/').pop();
        const imagePath = FileSystem.documentDirectory + imageName;
        try{

            await FileSystem.moveAsync({
                from: image,
                to: imagePath
            });

        }catch(err){

            console.log(err);
            throw err;

        }

        dispatch({
            type: ADD_PLACE,
            data:{
                title,
                image: imagePath
            }
        })

    }

 }

 export const deletePlace = ()=>{
    return {
        type: DELETE_PLACE
    }
}
