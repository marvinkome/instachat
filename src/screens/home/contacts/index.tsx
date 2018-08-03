import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';
import { View, Text } from 'react-native';

export class Contacts extends React.Component {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarLabel: 'Contacts'
    };

    render() {
        return (
            <View>
                <Text>Hello Groups</Text>
            </View>
        );
    }
}
