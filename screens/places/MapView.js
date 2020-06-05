import React, {useState, useEffect, useCallback} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, {Marker} from 'react-native-maps'

import colors from '../../constants/colors';

  const MapViewScreen = (props) => {

  const readOnly = props.navigation.getParam('readOnly');
  const lat = props.navigation.getParam('lat');
  const long = props.navigation.getParam('long');

  const [selectedLat, setSelectedLat] = useState();
  const [selectedLong, setSelectedLong] = useState();

  const mapRegion = {
    latitude:lat ? lat : 43.5891,
    longitude:long?long : -79.6389,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = (event) => {
    if(readOnly){
      return;
    }
    const latLocation = event.nativeEvent.coordinate.latitude;
    const lngLocation = event.nativeEvent.coordinate.longitude
    setSelectedLat(latLocation);
    setSelectedLong(lngLocation);
  };

  const saveLocationSelectionHandler = useCallback(() => {
    if(!selectedLong || !selectedLat){
      return
    }
    props.navigation.navigate('Create', {lat: selectedLat, long: selectedLong})
  }, [selectedLat, selectedLong]);
 
  useEffect(()=> {
    props.navigation.setParams({saveLocation: saveLocationSelectionHandler});
  }, [saveLocationSelectionHandler]);

  let selectedLocation = null;
  let marker;
    if(selectedLat && selectedLong){
      selectedLocation = {
        latitude: selectedLat,
        longitude: selectedLong
      }
    }else if(readOnly){
      selectedLocation = {
        latitude: lat,
        longitude: long
      }
    }
    if(selectedLocation){
      marker = <Marker title="Place Location" coordinate={selectedLocation}/>
    } else {
      marker = null;
    }

//***********************JSX component return ******************
  const { container} = styles;
  return(
    <MapView style={container} region={mapRegion} onPress={selectLocationHandler}>
      {marker}
    </MapView>
  )
//***********************JSX component return ******************
}



//***********************Navigation and Header return******************
MapViewScreen['navigationOptions'] = (navData)=> {
  const readOnlyMode = navData.navigation.getParam('readOnly');
  if(readOnlyMode){
    return {};
  }
  const saveMap = navData.navigation.getParam('saveLocation');

  const { headerBtn, headerTxt} = styles;
    return {
        title: 'Map',
        headerRight: () => {
          return <TouchableOpacity style={headerBtn} onPress={saveMap}>
                   <Text style={headerTxt}>Save</Text>
                 </TouchableOpacity>}

        

    };
}
//***********************Navigation and Header return******************

//***********************Styles******************

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   
  },
  headerBtn: {
    marginHorizontal: 20,
  },
  headerTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    borderColor: colors.orangeDark,
    borderWidth: 2, 
    borderRadius: 50,
    padding: 4,
    overflow: 'hidden',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
//***********************Styles******************


export default MapViewScreen