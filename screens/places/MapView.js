import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


/**
* @author
* @function MapView
**/
const MapView = (props) => {

const { container } = styles
 return(
  <View style={container}>
    <Text>MapView</Text>
  </View>
  )
}

MapView['navigationOptions'] = (navData)=> {
    return {
        title: 'Map',

    }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
  }
})
export default MapView