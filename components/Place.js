import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import colors from '../constants/colors';

const PlaceItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderColor: colors.cyanDark,
    borderWidth: 3,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: Colors.accentPurple
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Colors.orangeDark,
    borderWidth: 3
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    color: 'whitesmoke',
    fontSize: 18,
    marginBottom: 5,
    padding: 3,
    width: '100%',
    backgroundColor: 'rgba(0,0,0, 0.2)'

  },
  address: {
    color: '#666',
    fontSize: 16
  }
});

export default PlaceItem;