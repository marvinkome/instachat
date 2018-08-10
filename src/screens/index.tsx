import {
    createMaterialTopTabNavigator,
    createStackNavigator
} from 'react-navigation';

import color from '../lib/colors';
import { stackStyles, tabStyles } from '../styles';
import { Chats } from './home/chats';
import { Contacts } from './home/contacts';
import { Profile } from './home/profile';

const HomeTabNavigator = createMaterialTopTabNavigator(
    {
        Contacts,
        Chats,
        Profile
    },
    {
        tabBarOptions: {
            style: tabStyles.background,
            labelStyle: tabStyles.label,
            indicatorStyle: tabStyles.indicator,
            activeTintColor: color.primary,
            inactiveTintColor: color.text_title
        },
        initialRouteName: 'Contacts'
    }
);

const RootStackNavigator = createStackNavigator({
    Home: {
        screen: HomeTabNavigator,
        navigationOptions: {
            title: 'Chat App'.toUpperCase(),
            headerStyle: stackStyles.header,
            headerTitleStyle: stackStyles.title
        }
    },
    Chats
});

export default RootStackNavigator;
