import * as React from 'react';
import { withApollo, compose, WithApolloClient } from 'react-apollo';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import { UserSettingsStyles as styles } from './styles';

function Settings(props: NavigationInjectedProps & WithApolloClient<{}>) {
    const items = [
        { title: 'Invite Friends' },
        { title: 'FAQ' },
        { title: 'Help' },
        { title: 'About' },
        { title: 'Logout', onPress: () => props.navigation.navigate('Logout') }
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
