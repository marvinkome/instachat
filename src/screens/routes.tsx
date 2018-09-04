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
        Chats,
        // Contacts,
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

const RootStackNavigator = (initialRouteName: string) => {
    return createStackNavigator(
        {
            Home: {
                screen: HomeTabNavigator,
                navigationOptions: {
                    title: 'Chat App'.toUpperCase(),
                    headerStyle: stackStyles.header,
                    headerTitleStyle: stackStyles.title,
                    headerLeft: null
                }
            },
            Chat,
            Login
        },
        {
            initialRouteName
        }
    );
};

export default RootStackNavigator;
