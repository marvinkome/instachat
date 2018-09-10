import * as React from 'react';
import { withNavigation, NavigationInjectedProps as N } from 'react-navigation';

import { View } from 'react-native';
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

interface IProps {
    data: {
        user: {
            id: string;
            userGroups: Array<{
                group: {
                    id: string;
                    name: string;
                    messages: Array<{
                        id: string;
                        message: string;
                        timestamp: string;
                    }>;
                };
            }>;
        };
    };
}

class MainView extends React.Component<N & IProps> {
    formatItem = () => {
        const groups = this.props.data.user.userGroups;
        const formattedGroups = groups.reduce((total: ListingType[], curr) => {
            // reduce item to match list props
            let item = {
                id: curr.group.id,
                name: curr.group.name,
                text: 'No message',
                timestamp: '',
                unread: 0,
                image,
                onPress: () => null
            };

            // check if last message is available
            if (curr.group.messages.length) {
                item = {
                    ...item,
                    text: curr.group.messages[0].message,
                    timestamp: formatDate(
                        Number(curr.group.messages[0].timestamp)
                    )
                };
            }

            total.push(item);
            return total;
        }, []);

        return formattedGroups;
    };
    render() {
        const lists = this.formatItem();

        return (
            <View style={styles.container}>
                {/* check length of groups */}
                {this.props.data.user.userGroups.length ? (
                    <List containerStyle={styles.listContainer}>
                        {lists.map((item, index) => (
                            <ListItem
                                key={item.id}
                                typing={false}
                                listItem={item}
                            />
                        ))}
                    </List>
                ) : (
                    <EmptyList />
                )}

                {/* Fab to join and create group */}
                <GroupFab navigate={this.props.navigation.navigate} />
            </View>
        );
    }
}

export default withNavigation(MainView);
