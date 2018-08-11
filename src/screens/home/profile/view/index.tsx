import * as React from 'react';
import { View } from 'react-native';
import { UserData } from './user-data';
import { UserSettings } from './user-settings';
import { ViewStyles as styles } from './styles';

export default class PageView extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <UserData />
                <UserSettings />
            </View>
        );
    }
}
