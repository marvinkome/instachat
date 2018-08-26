import * as React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { UserDataStyles as styles } from './styles';

type IProps = {
    data: {
        username: string;
        about: string;
    };
};

export const UserData = (props: IProps) => {
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
                <Text style={styles.name}>{props.data.username}</Text>

                <Text style={styles.about} numberOfLines={1}>
                    {props.data.about || "Hey there, I'm on instaChat"}
                </Text>
            </View>
        </View>
    );
};
