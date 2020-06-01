import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import {useDispatch} from 'react-redux';

import * as placesActions from '../redux/actions/placeActions';
import colors from '../../constants/colors';



const PlaceCreate = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const savePlaceHandler = ()=> {
    dispatch(placesActions.addPlace(title));
    props.navigation.goBack();
  }
  const { form, label, input } = styles
 return(
    <ScrollView>
        <View style={form}>
          <Text style={label}>Title</Text>
          <TextInput

            style={input}
            value={title}
            onChangeText={(txt)=> setTitle(txt)}

          />
          <Button title="Save" color={colors.orangeDark} onPress={()=> savePlaceHandler}/>
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
  form:{
    margin: 30
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderBottomColor: '#cdcdcd',
    borderBottomWidth: 3,
    paddingVertical:5,
    paddingHorizontal: 3,
    backgroundColor: 'rgb(0,0,0,0.3)'
  }
})
export default PlaceCreate