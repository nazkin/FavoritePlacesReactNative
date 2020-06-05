import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MapScreen from '../screens/places/MapView';
import CreatePlaceScreen from '../screens/places/PlaceCreate';
import DetailedPlaceScreen from '../screens/places/PlaceDetail';
import PlaceListScreen from '../screens/places/PlaceList';


import colors from '../constants/colors';

const PlacesStackNav = createStackNavigator({
    Places: PlaceListScreen,
    Explore: DetailedPlaceScreen,
    Create: CreatePlaceScreen,
    Map: MapScreen
},{
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: colors.cyanDark
        },
        headerTintColor: 'ghostwhite'
    }
});

export default createAppContainer(PlacesStackNav);