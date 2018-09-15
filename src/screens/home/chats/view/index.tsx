import * as React from 'react';
import {
    compose,
    withState,
    withHandlers,
    ComponentEnhancer as CE
} from 'recompose';
import { withNavigation, NavigationInjectedProps as N } from 'react-navigation';

import { View, FlatList } from 'react-native';
import { List } from 'react-native-elements';

import { formatDate } from '../../../../lib/helpers';
import ListItem from './listing';
import { GroupFab } from './components/fab';
import { EmptyList } from './components/emptyMsg';
import { ViewStyles as styles } from './styles';

const image = require('../../../../../static/pp.jpg');

interface ListingType {
    id: string;
    name: string;
    text: string;
    timestamp: string;
    unread: number;
    image: null;
    onPress: () => void;
}

interface OProps {
    data: {
        user: {
            id: string;
            groups: Array<{
                id: string;
                name: string;
                messages: Array<{
                    id: string;
                    message: string;
                    timestamp: string;
                }>;
            }>;
        };
    };
}

function formatItem({ data, navigation }: N & OProps) {
    const groups = data.user.groups;
    const formattedGroups = groups.reduce((total: ListingType[], curr) => {
        // reduce item to match list props
        const unread = curr.messages.length;
        let item = {
            id: curr.id,
            name: curr.name,
            text: 'No message',
            timestamp: '',
            unread,
            image,
            onPress: () =>
                navigation.navigate('Chat', {
                    groupId: curr.id
                })
        };

        // check if last message is available
        if (unread) {
            item = {
                ...item,
                text: curr.messages[0].message,
                timestamp: formatDate(Number(curr.messages[0].timestamp))
            };
        }

        total.push(item);
        return total;
    }, []);

    return formattedGroups;
}

function MainView(props: N & OProps & {}) {
    const lists = formatItem(props);

    return (
        <View style={styles.container}>
            {/* check length of groups */}
            {props.data.user.groups.length ? (
                <List containerStyle={styles.listContainer}>
                    <FlatList
                        data={lists}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ListItem listItem={item} typing={false} />
                        )}
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

const enhance: CE<{}, OProps> = compose(withNavigation);

export default enhance(MainView);
