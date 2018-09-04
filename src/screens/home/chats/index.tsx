import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';
import View from './view';

export class Chats extends React.Component {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarLabel: 'Chats'
    };

    render() {
        return <View />;
    }
}
