import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


const PlaceDetail = (props) => {

const { container } = styles
 return(
  <View style={container}>
    <Text>PlaceDetail</Text>
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
   justifyContent: 'center',
   alignItems: 'center',
  }
})
export default PlaceDetail