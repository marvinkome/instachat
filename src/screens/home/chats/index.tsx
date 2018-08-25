import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';
import View from './view';

export class Chats extends React.Component {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarLabel: 'Chats'
    };

    render() {
        const lists = [
            {
                name: 'Larry John',
                text: 'You should be here by now, whats up?',
                image: require('../../../../static/pp.jpg'),
                timestamp: '12:47 AM'
            },
            {
                name: 'Jane Doe',
                text:
                    'Ive been trying to reach you all day \
                       and youre not picking up, is everything all right?',
                image: require('../../../../static/yuna.jpg'),
                timestamp: 'Yesterday'
            }
        ];
        return <View lists={lists} />;
    }
}
