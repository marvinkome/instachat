import * as React from 'react';

// main imports
import { compose, ComponentEnhancer as CE } from 'recompose';
import orderBy from 'lodash/orderBy';
import { withNavigation, NavigationInjectedProps as N } from 'react-navigation';

// UI
import { View, FlatList } from 'react-native';
import { List } from 'react-native-elements';

// components
import ListItem from './listing';
import { GroupFab } from './components/fab';
import { EmptyList } from './components/emptyMsg';

// styles
import { ViewStyles as styles } from './styles';

// types
import { ListingType, ViewProps } from '../types';

// helpers
import { formatDate } from '../../../../lib/helpers';
const image = require('../../../../../static/pp.jpg');

function formatItem({ data, navigation }: N & ViewProps) {
    const groups = data.groups;

    const formattedGroups = groups.reduce((reduced: ListingType[], group) => {
        // reduce item to match list props
        const unread = group.unreadCount;
        let item = {
            id: group.id,
            name: group.name,
            text: 'No message',
            timestamp: '',
            unread,
            image,
            onPress: () => false
        };

        // check if last message is available
        if (group.lastMessage) {
            item = {
                ...item,
                text: group.lastMessage.message,
                timestamp: formatDate(Number(group.lastMessage.timestamp)),
                onPress: () =>
                    navigation.navigate('Chat', {
                        groupId: group.id,
                        lastMessageId: group.lastMessage.timestamp
                    })
            };
        }

        reduced.push(item);
        return reduced;
    }, []);

    return orderBy(formattedGroups, 'timestamp', 'desc');
}

function MainView(props: N & ViewProps & {}) {
    const lists = formatItem(props);

    return (
        <View style={styles.container}>
            {/* check length of groups */}
            {props.data.groups.length ? (
                <List containerStyle={styles.listContainer}>
                    <FlatList
                        data={lists}
                        keyExtractor={(item) => item.id}
                        data-testid="chat-list"
                        renderItem={({ item }) => <ListItem listItem={item} typing={false} />}
                    />
                </List>
            ) : (
                <EmptyList />
            )}

            {/* Fab to join and create group */}
            <GroupFab navigate={props.navigation.navigate} />
        </View>
    );
}

const enhance: CE<{}, ViewProps> = compose(withNavigation);

export default enhance(MainView);
