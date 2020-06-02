import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {useSelector} from 'react-redux'

import Place from '../../components/Place';
import HeaderBtn from '../../components/HeaderBtn'



const PlaceList = (props) => {

const myPlaces = useSelector(state => state.places.places);

const renderPlacesHandler = (itemData)=> {
  return <Place title={itemData.item.title} address={null} image={itemData.item.imgUri} onSelect={()=>{
    props.navigation.navigate('Explore',{
      id: itemData.item.id,
      title: itemData.item.title
    });
  }}/>
}

const { container } = styles
 return <FlatList style={container} data={myPlaces} keyExtractor={(item)=> item.id} renderItem={renderPlacesHandler} />
}

PlaceList['navigationOptions'] = (navData)=> {
    return {
        title: 'Your Places',
        headerRight: ()=> {
           return <HeaderButtons HeaderButtonComponent={HeaderBtn}>
                <Item title="Add Place" iconName="ios-add" onPress={()=> navData.navigation.navigate('Create')}/>
            </HeaderButtons>
        }
    }
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
  }
})
export default PlaceList