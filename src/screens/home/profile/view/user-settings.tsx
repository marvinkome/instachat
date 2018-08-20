import * as React from 'react';
import { AsyncStorage, ToastAndroid } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { UserSettingsStyles as styles } from './styles';

async function logout() {
    await AsyncStorage.removeItem('client_id');
    await ToastAndroid.show('logged out', ToastAndroid.LONG);
}

export const UserSettings = () => {
    const items = [
        { title: 'Invite Friends' },
        { title: 'FAQ' },
        { title: 'Help' },
        { title: 'About' },
        { title: 'Logout', onPress: () => logout() }
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
};
