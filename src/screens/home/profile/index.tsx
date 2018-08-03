import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';
import { View, Text } from 'react-native';

export class Profile extends React.Component {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarLabel: 'Profile'
    };

    render() {
        return (
            <View>
                <Text>Hello profle</Text>
            </View>
        );
    }
}
