import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';

import colors from '../../constants/colors';
import MapPreview from '../../components/MapPreview';

const PlaceDetail = (props) => {

const placeId = props.navigation.getParam('id');
const placeInfo = useSelector(state => state.places.places.find(place=> place.id === placeId));
const placeTitle = props.navigation.getParam('title');

const { container, titleView, title, address, imgView, img, photoView, map } = styles
 return(
  <View style={container}>
    <View style={titleView}>
      <View style={photoView}>
        <Image  style={img} source={{uri: placeInfo.imgUri}}/>
      </View>
      <Text style={title}>" {placeTitle} " -- location photograph</Text>
    </View>

    <View  style={imgView}>
      <MapPreview style={map} latitude={placeInfo.lat} longitude={placeInfo.lng} onViewMap={()=> {
        props.navigation.navigate('Map',
         {
          readOnly: true,
          lat: placeInfo.lat,
          long: placeInfo.lng
        });
      }}/>
       <Text style={address}> {placeInfo.address} </Text>
    </View>
   
  </View>
  )
}

PlaceDetail['navigationOptions'] = (navData)=> {
    return {
        title: navData.navigation.getParam('title'),

    }
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingBottom: 30,
   backgroundColor: colors.cyanLight
  },
  titleView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cyanLight,
  },
  title: {
    width: '100%',
    padding: 10,
    backgroundColor: colors.accentPurple,
    fontSize: 24,
    fontStyle: 'italic',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  address:{
    width: '100%',
    padding: 10,
    backgroundColor: colors.orangeLight,
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  imgView: {
    width: '100%',
    minHeight: 250,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  photoView:{
    width: '100%',
    minHeight: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: 220,
    backgroundColor: colors.orangeDark
  },
  map:{
    width: '90%',
    height: 180,
    backgroundColor: colors.orangeDark
  }
})
export default PlaceDetail