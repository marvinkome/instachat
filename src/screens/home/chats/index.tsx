import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';
import { View, Text } from 'react-native';

export class Chats extends React.Component {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarLabel: 'Chats'
    };

    render() {
        return (
            <View>
                <Text>Hello Chatsqg</Text>
            </View>
        );
    }
}
