import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';
import View from './view';

export class Profile extends React.Component {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarLabel: 'Profile'
    };

    render() {
        return <View />;
    }
}
