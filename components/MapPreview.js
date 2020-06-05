import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import env from '../env'

const MapPreview = props => {

  let imagePreviewUrl = null;

    imagePreviewUrl =   `https://maps.googleapis.com/maps/api/staticmap?center=${props.latitude},${props.longitude}&zoom=13&size=300x150&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.latitude},${props.longitude}&key=${env.apiKey}`;
    // imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.latitude},${props.longitude}&zoom=14&size=300x150&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.latitude},${props.longitude}&key=${mapsData.apiKey}`;

        return (
            <TouchableOpacity style={{ ...styles.mapPreview, ...props.style }} onPress={props.onViewMap}>
                <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
            </TouchableOpacity>
        )
} 
  const styles = StyleSheet.create({
    mapPreview: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    mapImage: {
      width: '100%',
      height: 150
    }
  });
  
  export default MapPreview