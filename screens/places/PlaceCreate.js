import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import {useDispatch} from 'react-redux';

import * as placesActions from '../redux/actions/placeActions';
import colors from '../../constants/colors';
import ImageTaker from '../../components/ImagePicker';
import LocationSelector from '../../components/LocationPicker';

const PlaceCreate = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [mapLat, setMapLat] = useState();
  const [mapLong, setMapLong] = useState();

  const mapLatitude = props.navigation.getParam('lat');
  const mapLongitude = props.navigation.getParam('long');

  useEffect(()=> {
    if(mapLatitude){
      setMapLat(mapLatitude);
      setMapLong(mapLongitude);
    }
  }, [mapLatitude, mapLongitude]);

  const locationPickedHandler = (lat, long)=> {
    setMapLat(lat);
    setMapLong(long);

  }

  const savePlaceHandler = (textTitle, image, lat, long)=> {
    dispatch(placesActions.addPlace(textTitle, image, lat, long));
    props.navigation.goBack();
  }
  const imageSelectionHandler = (imgURI) =>{
    setSelectedImg(imgURI)
  }

  const setLocationWithMapHandler = () => {
    props.navigation.navigate('Map');
  }
  const { container,form, label, input, submitBtn } = styles
 return(
    <ScrollView style={container}>
        <View style={form}>
          <Text style={label}>Title</Text>
          <TextInput
            autoFocus={true}
            style={input}
            value={title}
            onChangeText={(txt)=> setTitle(txt)}

          />

          <ImageTaker onImageSelect={imageSelectionHandler}/>
          <LocationSelector onViewMap={setLocationWithMapHandler} mapLat={mapLat} mapLong={mapLong} onLocationSelect= {locationPickedHandler}/>
          <View style={submitBtn}>
            <Button title="Save Place" color={colors.orangeDark} onPress={()=> savePlaceHandler(title, selectedImg, mapLat, mapLong)}/>
          </View>
        </View>
    </ScrollView>
  )
}

PlaceCreate['navigationOptions'] = (navData)=> {
    return {
        title: 'Add Place',

    }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.cyanLight,
  
  },
  form:{
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    padding: 5, 
    backgroundColor: colors.orangeDark,
    alignSelf:'flex-start',
    width: '60%',
    borderRadius: 10
  },
  input: {
    borderBottomColor: colors.orangeDark,
    borderBottomWidth: 3,
    paddingVertical:5,
    paddingHorizontal: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 15,
    width: '100%',
    borderRadius: 10
  },
  submitBtn:{
    width: '80%',
    borderWidth: 3,
    borderColor: 'whitesmoke',
    borderRadius: 15,
    overflow: 'hidden',
  }
})
export default PlaceCreate