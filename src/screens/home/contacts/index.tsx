import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';
import View from './view';

export class Contacts extends React.Component {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarLabel: 'Contacts'
    };

    render() {
        return <View />;
    }
}
