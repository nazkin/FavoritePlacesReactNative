import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {useSelector, useDispatch} from 'react-redux'

import Place from '../../components/Place';
import HeaderBtn from '../../components/HeaderBtn'
import * as placeActions from '../redux/actions/placeActions';
import colors from '../../constants/colors'

const PlaceList = (props) => {
  const [serverError, setServerError] = useState(null);

const dispatch = useDispatch();
const myPlaces = useSelector(state => state.places.places);

useEffect(()=> {
  setServerError(null);
  try{
    dispatch(placeActions.fetchPlacesData())
  }catch(err){
    setServerError(err);
  }
 
},[dispatch])

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
   backgroundColor: colors.cyanLight
  }
})
export default PlaceList