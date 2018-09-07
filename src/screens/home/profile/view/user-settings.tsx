import * as React from 'react';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { AsyncStorage, ToastAndroid } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { UserSettingsStyles as styles } from './styles';

async function logout(fn: (arg: any) => boolean) {
    await AsyncStorage.removeItem('client_id');
    ToastAndroid.show('logged out', ToastAndroid.LONG);
    fn('Login');
}

export const UserSettings = withNavigation((props: NavigationInjectedProps) => {
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
});
