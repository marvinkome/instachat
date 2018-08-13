import {
    createMaterialTopTabNavigator,
    createStackNavigator
} from 'react-navigation';

import color from '../lib/colors';
import { stackStyles, tabStyles } from '../styles';

// home tabs
import { Chats } from './home/chats';
import { Contacts } from './home/contacts';
import { Profile } from './home/profile';

// chat screen
import Chat from './chat';

// login screen
import Login from './login';

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
        }
    }
);

const RootStackNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeTabNavigator,
            navigationOptions: {
                title: 'Chat App'.toUpperCase(),
                headerStyle: stackStyles.header,
                headerTitleStyle: stackStyles.title
            }
        },
        Chat,
        Login
    },
    {
        initialRouteName: 'Login'
    }
);

export default RootStackNavigator;
