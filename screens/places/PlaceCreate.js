import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import {useDispatch} from 'react-redux';

import * as placesActions from '../redux/actions/placeActions';
import colors from '../../constants/colors';
import ImageTaker from '../../components/ImagePicker';
import LocationSelector from '../../components/LocationPicker';

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
  const { container,form, label, input, submitBtn } = styles
 return(
    <ScrollView style={container}>
        <View style={form}>
          <Text style={label}>Title</Text>
          <TextInput
            autoFocus={true}
            style={input}
            value={title}
            onChangeText={(txt)=> setTitle(txt)}

          />

          <ImageTaker onImageSelect={imageSelectionHandler}/>
          <LocationSelector />
          <View style={submitBtn}>
            <Button title="Save" color={colors.orangeLight} onPress={()=> savePlaceHandler(title, selectedImg)}/>
          </View>
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
  container:{
    backgroundColor: colors.cyanLight,
  
  },
  form:{
    margin: 20,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    padding: 5, 
    backgroundColor: colors.orangeDark,
    alignSelf:'flex-start',
    width: '60%',
    borderRadius: 10
  },
  input: {
    borderBottomColor: colors.orangeDark,
    borderBottomWidth: 3,
    paddingVertical:5,
    paddingHorizontal: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 15,
    width: '100%',
    borderRadius: 10
  },
  submitBtn:{
    width: '50%',
    borderWidth: 1,
    borderColor: colors.orangeDark,
    borderRadius: 20,
    overflow: 'hidden',
  }
})
export default PlaceCreate