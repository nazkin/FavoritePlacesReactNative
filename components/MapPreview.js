import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import * as mapsData from '../env'

const MapPreview = props => {

  let imagePreviewUrl = nu;

  if (props.latitude && props.longitude) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
      props.latitude
    },${
      props.longitude
    }&zoom=14&size=300x150&maptype=roadmap&markers=color:red%7Clabel:A%7C${
      props.latitude
    },${props.longitude}&key=${mapsData.apiKey}`;
  }

    if(imagePreviewUrl){
        return (
            <TouchableOpacity style={{ ...styles.mapPreview, ...props.style }}>
                <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
            </TouchableOpacity>
          );
    }else {
        return null;
    }
} 
  const styles = StyleSheet.create({
    mapPreview: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    mapImage: {
      width: '100%',
      height: 150
    }
  });
  
  export default MapPreview