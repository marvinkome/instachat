import * as React from 'react';

// main imports
import { compose, ComponentEnhancer as CE } from 'recompose';
import orderBy from 'lodash/orderBy';
import { withNavigation, NavigationInjectedProps as N } from 'react-navigation';
import firebase from 'react-native-firebase';

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
import { formatDate } from '../../../../../lib/helpers';
const image = require('../../../../../../static/pp.jpg');

type ViewState = {
    usersTyping: object;
};

class MainView extends React.Component<N & ViewProps & {}, ViewState> {
    state: ViewState = {
        usersTyping: {}
    };

    componentDidMount() {
        this.subscribeToGroup();
    }
    componentDidUpdate(prevProps: ViewProps) {
        // if no new data
        if (!this.props.typingData) {
            return;
        }

        // if prev props is falsy then return new state
        if (!prevProps.typingData) {
            const ut = this.updateTypingUsers(this.props.typingData);
            return this.setState({
                usersTyping: ut
            });
        }

        // if isTyping or username is un-changed
        const { userGroupTyping: oldData } = prevProps.typingData;
        const { userGroupTyping: newData } = this.props.typingData;

        if (
            oldData.isTyping === newData.isTyping &&
            oldData.user.username === newData.user.username
        ) {
            return;
        }

        // when theres no problem
        const usersTyping = this.updateTypingUsers(this.props.typingData);
        return this.setState({
            usersTyping
        });
    }

    updateTypingUsers = (typingData: any) => {
        // check that typingData is available
        const { usersTyping } = this.state;

        const {
            isTyping,
            group: { id },
            user: { username }
        } = typingData.userGroupTyping;

        if (isTyping) {
            // if typing state is true
            if (usersTyping[id]) {
                // if group data is in state
                // add user to group in local state
                if (usersTyping[id].indexOf(username) >= 0) {
                    // if user is already in group
                    return usersTyping; // return the current state
                } else {
                    return {
                        ...usersTyping,
                        [id]: usersTyping[id].concat(username)
                    }; // add user to state
                }
            } else {
                return {
                    ...usersTyping,
                    [id]: [username]
                }; // add new group with user to state
            }
        } else {
            // remove user from local state
            return {
                ...usersTyping,
                ...(usersTyping[id] && {
                    [id]: usersTyping[id].filter((item: string) => item !== username)
                })
            };
        }
    };

    getTypingUsers(groupID: string) {
        const users = this.state.usersTyping[groupID];

        if (!users) {
            return null;
        }

        const length = users.length;

        if (!length) {
            return null;
        }

        const text = length === 1 ? 'is' : 'are';
        const punc = length === 1 ? '' : ',';
        const multiple = length > 2;

        const typingUsers = multiple
            ? 'multiple people'
            : users.join(`${punc} `).replace(/,([^,]*)$/, ' and$1');

        return `${typingUsers} ${text} typing...`;
    }

    subscribeToGroup() {
        this.props.data.groups.forEach((group) => {
            firebase.messaging().subscribeToTopic(group.id);
        });
    }

    formatItem = () => {
        const groups = this.props.data.groups;

        const formattedGroups = groups.reduce((reduced: ListingType[], group) => {
            // get icon
            const groupImage = group.image
                ? { source: { uri: group.image } }
                : { icon: { name: 'group', type: 'material-icons' } };

            // reduce item to match list props
            const unread = group.unreadCount;
            let item = {
                id: group.id,
                name: group.name,
                text: 'No message',
                timestamp: '',
                unread,
                image: groupImage,
                onPress: () => false,
                typing: false
            };

            // check if last message is available
            if (group.lastMessage) {
                item = {
                    ...item,
                    text: group.lastMessage.message,
                    timestamp: formatDate(Number(group.lastMessage.timestamp)),
                    onPress: () =>
                        this.props.navigation.navigate('Chat', {
                            groupId: group.id,
                            lastMessageId: group.lastMessage.timestamp
                        })
                };
            }

            if (this.state.usersTyping[group.id] && this.state.usersTyping[group.id].length) {
                const typingUser = this.getTypingUsers(group.id);
                item = {
                    ...item,
                    ...(typingUser && {
                        text: typingUser,
                        typing: true
                    })
                };
            }

            reduced.push(item);
            return reduced;
        }, []);

        return orderBy(formattedGroups, 'timestamp', 'desc');
    };

    render() {
        const lists = this.formatItem();

        return (
            <View style={styles.container}>
                {/* check length of groups */}
                {this.props.data.groups.length ? (
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
                <GroupFab navigate={this.props.navigation.navigate} />
            </View>
        );
    }
}

const enhance: CE<{}, ViewProps> = compose(withNavigation);

export default enhance(MainView);
