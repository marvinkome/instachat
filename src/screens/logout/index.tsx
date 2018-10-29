import * as React from 'react';
import {
    ActivityIndicator,
    View,
    AsyncStorage,
    StyleSheet,
    Text,
    ToastAndroid
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import firebase from 'react-native-firebase';

import { clientId } from '../../lib/helpers';
import { auth } from '../../lib/auth';
import apollo from '../../lib/apollo';
import theme from '../../lib/colors';
import { GROUP_ID } from './gql';

export default class Logout extends React.Component<NavigationScreenProps> {
    constructor(props: any) {
        super(props);
        this.processLogout();
    }

    render() {
        return (
            <View style={style.cont}>
                <ActivityIndicator size="large" color={theme.secondary.regular} />
                <Text />
            </View>
        );
    }

    private async unsubscribeFromGroups(res: any) {
        if (!res || res.errors) {
            return;
        }

        const groups = res.data.groups;

        groups.forEach((group: any) => {
            firebase.messaging().unsubscribeFromTopic(group.id);
        });
    }

    private processLogout = async () => {
        // token
        const token = await clientId();

        // logout in server
        await auth('logout', {}, { headers: { authorization: token } });

        // init apollo
        const { persistor, client } = await apollo();

        // get all groups id and unsubscribe from each
        const groups = await client.query({query: GROUP_ID}).catch((e) => null);
        await this.unsubscribeFromGroups(groups);

        // reset apollo and purge cache
        client.resetStore();
        persistor.purge();

        // remove local token
        await AsyncStorage.clear();

        // navigate to login page
        ToastAndroid.show('logged out successfully', ToastAndroid.LONG);
        this.props.navigation.navigate('Login');
    };
}

const style = StyleSheet.create({
    cont: {
        backgroundColor: theme.primary.regular,
        flex: 1,
        justifyContent: 'center'
    }
});
