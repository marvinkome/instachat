import {
    createMaterialTopTabNavigator,
    createStackNavigator
} from 'react-navigation';

import { stackStyles, tabStyles } from '../styles';
import { Chats } from './home/chats';
import { Groups } from './home/groups';

const HomeTabNavigator = createMaterialTopTabNavigator(
    {
        HomeChats: Chats,
        HomeGroups: Groups
    },
    {
        tabBarOptions: {
            style: tabStyles.background,
            labelStyle: tabStyles.label
        }
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
