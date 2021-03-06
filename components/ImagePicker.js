import React, {useState} from 'react'
import { View, Text, StyleSheet,Image, Button, Alert } from 'react-native'
import colors from '../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
/**
* @author
* @function ImagePickerComponent
**/
const ImagePickerComponent = (props) => {

const [takenImage, setTakenImage] = useState(null);

const verifyPermissions = async ()=> {
    const resCamera = await Permissions.askAsync(Permissions.CAMERA);
    const resCameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if(resCamera.status !== 'granted' || resCameraRoll.status !== 'granted'){
        Alert.alert(
            'Permission to use camera denied',
            'A picture can not be take without permission to use camera',
            [
                {text: 'Okay'}
            ]
        )
        return false;
    }
    return true;
}

const takeImageHandler = async ()=>{
    const havePermission = await verifyPermissions();
    if(!havePermission){
        return;
    }
   const image = await ImagePicker.launchCameraAsync({
       allowsEditing: true,
       aspect: [16, 8],
       quality: 0.3

   });
   setTakenImage(image.uri);
   props.onImageSelect(image.uri);
}

const { imagePicker, imagePreview, image, noImgTxt, takePhoto} = styles
 return(
  <View style={imagePicker}>
      <View style={imagePreview}>
          {takenImage ? <Image  style={image} source={{uri: takenImage}}/> :<Text style={noImgTxt}>Please select image</Text>}    
      </View>
      <View style ={takePhoto}>
        <Button title="Take Photo" color={colors.cyanDark} onPress={takeImageHandler}/>
      </View>
  </View>
  )
}


const styles = StyleSheet.create({
  imagePicker: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   width: '90%'
  },
  imagePreview:{
      width: '100%',
      minHeight: 100,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  image:{
      width: '100%',
      height: 180
  },
  noImgTxt:{
      width: '60%',
      textAlign: 'center',
      padding:10,
      fontSize:20,
      color: 'ghostwhite',
      borderBottomColor: colors.cyanDark,
      borderBottomWidth: 4,
      backgroundColor: 'rgba(0,0,0,0.5)',
  },
  takePhoto: {
      width: '100%',
      padding: 5,
      backgroundColor: colors.orangeDark,
      marginBottom: 20,
      borderRadius: 10
  }
})
export default ImagePickerComponent