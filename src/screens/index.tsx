// import * as React from 'react';
import {
    createMaterialTopTabNavigator,
    createStackNavigator,
    createDrawerNavigator
} from 'react-navigation';

import AllChats from './main';
import Chats from './chat';
// import Login from './login';

// Home tab and drawer navigation
const HomeTabNavigator = createMaterialTopTabNavigator({
    HomeChats: AllChats,
    HomeGroups: Chats
});

const HomeDrawerNavigator = createDrawerNavigator({
    Profile: HomeTabNavigator
});

const RootStackNavigator = createStackNavigator({
    Home: HomeDrawerNavigator
});

export default RootStackNavigator;
