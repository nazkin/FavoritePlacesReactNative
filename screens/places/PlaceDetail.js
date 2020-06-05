import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';

import colors from '../../constants/colors';
import MapPreview from '../../components/MapPreview';

const PlaceDetail = (props) => {

const placeId = props.navigation.getParam('id');
const placeInfo = useSelector(state => state.places.places.find(place=> place.id === placeId));
const placeTitle = props.navigation.getParam('title');

const { container, titleView, title, address, imgView, img } = styles
 return(
  <View style={container}>
    <View style={titleView}>
      <Text style={title}> {placeTitle} </Text>
     
    </View>
    <View style={imgView}>
      <Image  style={img} source={{uri: placeInfo.imgUri}}/>
    </View>
    <View  style={imgView}>
      <MapPreview style={img} latitude={placeInfo.lat} longitude={placeInfo.lng} onViewMap={()=> {
        props.navigation.navigate('Map');
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
   paddingHorizontal: 20,
   paddingVertical: 30,
   backgroundColor: 'ivory'
  },
  titleView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cyanLight,
    height: 50
  },
  title: {
    width: '100%',
    padding: 10,
    backgroundColor: colors.orangeDark,
    fontSize: 24,
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
  img: {
    width: '90%',
    height: 170,
    backgroundColor: colors.orangeDark
  }
})
export default PlaceDetail