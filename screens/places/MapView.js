import React, {useState, useEffect, useCallback} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, {Marker} from 'react-native-maps'

import colors from '../../constants/colors';

  const MapViewScreen = (props) => {
  const [selectedLat, setSelectedLat] = useState(null);

  const [selectedLong, setSelectedLong] = useState(null);

  const mapRegion = {
    latitude: 43.5891,
    longitude: -79.6389,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = (event) => {
    setSelectedLat(event.nativeEvent.coordinate.latitude);
    setSelectedLong(event.nativeEvent.coordinate.longitude);
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

  let selectedLocation;
    if(selectedLat && selectedLong){
      selectedLocation = {
        latitude: selectedLat,
        longitude: selectedLong
      }
    }

//***********************JSX component return ******************
  const { container} = styles;
  return(
    <MapView style={container} region={mapRegion} onPress={selectLocationHandler}>
      {selectedLocation ? <Marker title="Place Location" coordinate={selectedLocation}/> : null}
    </MapView>
  )
//***********************JSX component return ******************
}



//***********************Navigation and Header return******************
MapViewScreen['navigationOptions'] = (navData)=> {
  const saveMap = navData.navigation.getParam('saveLocation');
  const { headerBtn, headerTxt} = styles;
    return {
        title: 'Map',
        headerRight: () => {
          return <TouchableOpacity style={headerBtn} onPress={saveMap}>
                   <Text style={headerTxt}>Save</Text>
                 </TouchableOpacity>}

        

    }
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
    
    backgroundColor: colors.cyanLight
  },
  headerTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.orangeDark,
    borderColor: colors.orangeDark,
    borderWidth: 2, 
    borderRadius: 50,
    padding: 4,
    overflow: 'hidden'
  }
});
//***********************Styles******************


export default MapViewScreen