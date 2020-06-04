import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native'
import colors from '../constants/colors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from '../components/MapPreview';


const LocationSelect = (props) => {
const [locLoad, setLocLoad] = useState(false);
const [lat, setLat] = useState();
const [long, setLong] = useState();


const verifyPermissions = async ()=> {
    const resLocation = await Permissions.askAsync(Permissions.LOCATION);
    // const resCameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if(resLocation.status !== 'granted'){
        Alert.alert(
            'Permission to use GPS location denied',
            'A location can not be selected without permission to use GPS location tool',
            [
                {text: 'Okay'}
            ]
        )
        return false;
    }
    return true;
}
const selectLocationHandler = async ()=> {
    const havePermission = await verifyPermissions();
    
    if(!havePermission){
        return;
    }

    try{
        setLocLoad(true);
        const location = await Location.getCurrentPositionAsync({
            timeout: 8000
        });

        setLat(location.coords.latitude);
        setLong(location.coords.longitude);
        setLocLoad(false);
    }catch(err){
        setLocLoad(false);
        Alert.alert('Could not fetch location', 'Try again or use the maps tool instead', [{text: 'Okay'}]);
    }
}

    //STYLES FOR THE JSX*************************
    const { container, locSelect, locTxt, locPicker } = styles
    //STYLES FOR THE JSX*************************

    let mapSection;
    if(long && lat){
        mapSection = <MapPreview style={locSelect} longitude={long} latitude={lat} onViewMap={props.onViewMap}/>;
    }else {
        mapSection = <View style={locSelect}><Text style={locTxt}>Select your location</Text></View>;
    }
   
 if(locLoad){
     return (
         <View style={container}>
             <ActivityIndicator size="large" color={colors.cyanDark}/>
         </View>
     )
 }

 return(
  <View style={container}>
        {mapSection}
    <View style={locPicker}>
            <Button title="Use GPS Location" color={colors.accentPurple} onPress={selectLocationHandler}/>
            <Button title="Use Google Maps" color={colors.cyanDark} onPress={props.onViewMap}/>
        </View>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   width: '90%',
   minHeight: 160,
   justifyContent: 'center',
   alignItems: 'center',
   marginBottom: 30
  },
  locSelect:{
      width: '100%',
      minHeight:100,
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0, 0.4)'
      
  },
  locTxt:{
      width:"60%",
      padding: 10,
      color: 'ghostwhite',
      borderBottomColor: colors.cyanDark,
      borderBottomWidth: 3,
      fontSize: 20,
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0, 0.5)'
      
  },
  locPicker:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    backgroundColor: colors.orangeDark,
    marginBottom: 20,
    borderRadius:10
    
  }

})
export default LocationSelect