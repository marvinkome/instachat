import * as React from 'react';
import { List, ListItem } from 'react-native-elements';
import { UserSettingsStyles as styles } from './styles';

export const UserSettings = () => {
    const items = [
        { title: 'Invite Friends' },
        { title: 'FAQ' },
        { title: 'Help' },
        { title: 'About' }
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
