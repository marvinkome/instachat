import * as React from 'react';
import {
    createMaterialTopTabNavigator,
    NavigationScreenProps as NP
} from 'react-navigation';

// styles
import color from '../../lib/colors';
import { tabStyles, stackStyles } from '../../styles';

// home tabs
import { Chats } from './chats';
import { Profile } from './profile';

const HomeTabNavigator = createMaterialTopTabNavigator(
    {
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

export default class Main extends React.Component<NP> {
    static navigationOptions = {
        title: 'InstaChat'.toUpperCase(),
        headerStyle: stackStyles.header,
        headerTitleStyle: stackStyles.title,
        headerLeft: null
    };
    static router = HomeTabNavigator.router;

    render() {
        return <HomeTabNavigator navigation={this.props.navigation} />;
    }
}
