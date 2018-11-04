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

import { clientId, showAlert } from '../../lib/helpers';
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

        return new Promise((resolv, e) => {
            if (groups.length) {
                groups.forEach((group: any, index: any, array: any[]) => {
                    firebase.messaging().unsubscribeFromTopic(group.id);
                    if (index === array.length - 1) {
                        resolv(undefined);
                    }
                });
            } else {
                resolv(undefined);
            }
        });
    }

    private processLogout = async () => {
        // init apollo
        const { persistor, client } = await apollo();

        // get all groups id and unsubscribe from each
        const groups = await client.query({ query: GROUP_ID }).catch((e) => null);
        await this.unsubscribeFromGroups(groups);

        // token
        const token = await clientId();

        // logout in server
        try {
            await auth('logout', {}, { headers: { authorization: token } });
        } catch (e) {
            showAlert('There was an error when trying to logout');
            return this.props.navigation.navigate('Main');
        }

        // reset apollo and purge cache
        client.resetStore();
        persistor.purge();

        // remove local token
        await AsyncStorage.removeItem('client_id');

        // navigate to login page
        ToastAndroid.show('logged out successfully', ToastAndroid.LONG);
        return this.props.navigation.navigate('Login');
    };
}

const style = StyleSheet.create({
    cont: {
        backgroundColor: theme.primary.regular,
        flex: 1,
        justifyContent: 'center'
    }
});
