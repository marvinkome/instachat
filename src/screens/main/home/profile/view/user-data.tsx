import * as React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { Avatar } from 'react-native-elements';
import { withNavigation, NavigationInjectedProps as NIP } from 'react-navigation';
import { UserDataStyles as styles } from './styles';

type IProps = {
    data: {
        username: string;
        about: string;
        profilePic: string;
    };
};

export const UserData = withNavigation((props: IProps & NIP) => {
    const avatarProps = {
        ...(!props.data.profilePic
            ? { title: props.data.username.slice(0, 2).toUpperCase() }
            : { source: { uri: props.data.profilePic } })
    };

    return (
        <TouchableNativeFeedback onPress={() => props.navigation.navigate('EditProfile')}>
            <View style={styles.container} data-testId="user-data-view">
                <View style={[{ flex: 1 }, styles.innerContainer]}>
                    <Avatar rounded={true} large={true} {...avatarProps} />
                </View>
                <View style={[{ flex: 2 }, styles.innerContainer]}>
                    <Text style={styles.name}>{props.data.username}</Text>

                    <Text style={styles.about} numberOfLines={1}>
                        {props.data.about || "Hey there, I'm on instaChat"}
                    </Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
});
