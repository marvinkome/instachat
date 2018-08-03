import {
    createMaterialTopTabNavigator,
    createStackNavigator
} from 'react-navigation';

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
            activeTintColor: '#42ED86',
            inactiveTintColor: 'hsl(0, 0%, 25%)'
        },
        initialRouteName: 'Chats'
    }
);

const RootStackNavigator = createStackNavigator({
    Home: {
        screen: HomeTabNavigator,
        navigationOptions: {
            title: 'Messages'.toUpperCase(),
            headerStyle: stackStyles.header,
            headerTitleStyle: stackStyles.title
        }
    },
    Chats
});

export default RootStackNavigator;
