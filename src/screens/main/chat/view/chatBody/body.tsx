import * as React from 'react';
import _ from 'lodash';
import moment from 'moment';

// UI Elements
import { FlatList, Text } from 'react-native';
import { List } from 'react-native-elements';
import Hr from '../../../../../components/Hr';
import { ChatMsg } from './listItem';

// styles
import theme from '../../../../../lib/colors';
import { chatMsg as style } from './styles';

// types
import { Props } from './index';

import { contextConnect } from '../../../../../lib/context';
import context from '../../context';
import { ViewProps } from '../../types';

const ITEM_HEIGHT = 72.667;
const THRESHOLD = 1;

type ChatBodyProps = Props & {
    items: Array<{
        id: string;
        from: {
            id: string;
            username: string;
        };
        message: string;
        timestamp: any;
    }>;
    typingData?: {
        userTyping: {
            user: {
                username: string;
            };
            isTyping: boolean;
        };
    };
    unreadCount: number;
    lastViewedMessage: string;
    fetchMore: () => void;
    refreshing: boolean;
};

type ChatBodyState = {
    usersTyping: string[];
};

export class ChatBody extends React.Component<ChatBodyProps, ChatBodyState> {
    state: ChatBodyState = {
        usersTyping: []
    };

    componentDidUpdate(prevProps: ChatBodyProps) {
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
        const { userTyping: oldData } = prevProps.typingData;
        const { userTyping: newData } = this.props.typingData;

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
            user: { username }
        } = typingData.userTyping;

        // check if typing state is true
        if (isTyping) {
            // add user to local state
            if (usersTyping.indexOf(username) >= 0) {
                // check if user is not already in state
                return usersTyping; // return the current state
            } else {
                return usersTyping.concat(username); // add user to state
            }
        } else {
            // remove user from local state
            return usersTyping.filter((item) => item !== username);
        }
    };

    checkIfBeginningReached = ({ nativeEvent }: any) => {
        const { layoutMeasurement, contentOffset } = nativeEvent;
        const currentPos = layoutMeasurement.height + contentOffset.y;
        const listLength = ITEM_HEIGHT * this.props.items.length;
        const reactThreshold = listLength - ITEM_HEIGHT * THRESHOLD;

        if (!this.props.refreshing && currentPos >= reactThreshold) {
            this.props.fetchMore();
        }
    };

    renderItem = (props: any) => {
        const newMessageId = this.props.lastViewedMessage;

        return props.item.messages.map((item: any) => {
            return (
                <React.Fragment key={item.id}>
                    <ChatMsg {...item} />
                    {newMessageId &&
                        item.id === newMessageId && (
                            <Hr
                                lineStyle={{ backgroundColor: theme.secondary.regular }}
                                textStyle={{ color: theme.secondary.typo.sub }}
                                text="New Message"
                            />
                        )}
                </React.Fragment>
            );
        });
    };

    renderTypingUsers() {
        const users = this.state.usersTyping;
        const length = users.length;

        if (!length) {
            return null;
        }

        const text = length === 1 ? 'is' : 'are';
        const punc = length === 1 ? '' : ',';
        const multiple = length > 3;

        return (
            <Text style={style.typingIndicator}>
                {multiple
                    ? 'multiple people'
                    : users.join(`${punc} `).replace(/,([^,]*)$/, ' and$1')}{' '}
                {text} typing...
            </Text>
        );
    }

    renderEmptyGroup() {
        return <Text style={style.emptyText}>Welcome to the beginning of the group</Text>;
    }

    itemSeparator = ({ leadingItem }: any) => (
        <Hr
            text={moment(leadingItem.timestamp, 'ddd MMM DD YYYY').format('D MMM Y')}
            lineStyle={style.dateDivider}
        />
    );

    render() {
        const data = _.chain(this.props.items)
            .groupBy((item) => new Date(Number(item.timestamp)).toDateString())
            .map((messages, timestamp) => ({ messages, timestamp }))
            .value();

        return (
            <List containerStyle={style.listContainer}>
                <FlatList
                    data={data}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.itemSeparator}
                    keyExtractor={(item) => item.timestamp}
                    onScroll={this.checkIfBeginningReached}
                    ListEmptyComponent={this.renderEmptyGroup()}
                    inverted
                />
                {this.renderTypingUsers()}
            </List>
        );
    }
}

const mapper = ({ group, fetchMore, refreshing }: ViewProps) => ({
    items: group.messages,
    groupId: group.id,
    unreadCount: group.unreadCount,
    lastViewedMessage: group.lastViewedMessage,
    fetchMore,
    refreshing
});

export default contextConnect(context, mapper)(ChatBody);
