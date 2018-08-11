import * as React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { UserDataStyles as styles } from './styles';

export const UserData = () => {
    return (
        <View style={styles.container} data-testId="user-data-view">
            <View style={[{ flex: 1 }, styles.innerContainer]}>
                <Avatar
                    rounded={true}
                    large={true}
                    source={require('../../../../../static/pp.jpg')}
                />
            </View>
            <View style={[{ flex: 2 }, styles.innerContainer]}>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.about} numberOfLines={1}>
                    Ive been trying to reach you all day and youre not picking
                    up, is everything all right?
                </Text>
            </View>
        </View>
    );
};
