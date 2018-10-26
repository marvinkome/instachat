import * as React from 'react';
import { auth } from '../../../../../lib/auth';
import { clientId } from '../../../../../lib/helpers';
import apollo from '../../../../../lib/apollo';
import { withApollo, compose, WithApolloClient } from 'react-apollo';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { AsyncStorage, ToastAndroid } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { UserSettingsStyles as styles } from './styles';

function Settings(props: NavigationInjectedProps & WithApolloClient<{}>) {
    async function logout(navigate: (arg: any) => boolean) {
        // token
        const token = await clientId();

        // logout in server
        await auth('logout', { headers: { authorization: token } });

        // remove local token
        await AsyncStorage.removeItem('client_id');

        // reset apollo
        const { persistor } = await apollo();
        props.client.resetStore();
        persistor.purge();

        // navigate to login page
        ToastAndroid.show('logged out', ToastAndroid.LONG);
        navigate('Login');
    }

    const items = [
        { title: 'Invite Friends' },
        { title: 'FAQ' },
        { title: 'Help' },
        { title: 'About' },
        { title: 'Logout', onPress: () => logout(props.navigation.navigate) }
    ];

    return (
        <List containerStyle={styles.list} data-testId="list">
            {items.map((item, index) => (
                <ListItem
                    key={index}
                    hideChevron={true}
                    containerStyle={styles.listItem}
                    titleStyle={styles.title}
                    {...item}
                />
            ))}
        </List>
    );
}
export const UserSettings = compose(
    withNavigation,
    withApollo
)(Settings);
