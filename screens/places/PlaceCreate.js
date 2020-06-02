import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import {useDispatch} from 'react-redux';

import * as placesActions from '../redux/actions/placeActions';
import colors from '../../constants/colors';
import ImageTaker from '../../components/ImagePicker'


const PlaceCreate = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const savePlaceHandler = (textTitle, image)=> {
    dispatch(placesActions.addPlace(textTitle, image));
    props.navigation.goBack();
  }
  const imageSelectionHandler = (imgURI) =>{
    setSelectedImg(imgURI)
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

          <ImageTaker onImageSelect={imageSelectionHandler}/>
          <Button title="Save" color={colors.accentPurple} onPress={()=> savePlaceHandler(title, selectedImg)}/>
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
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 10
  }
})
export default PlaceCreate