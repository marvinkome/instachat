import * as React from 'react';
import _ from 'lodash';
import moment from 'moment';

// UI Elements
import { FlatList } from 'react-native';
import { List } from 'react-native-elements';
import Hr from '../../../../components/Hr';
import { ChatMsg } from './listItem';

// styles
import { chatMsg as style } from './styles';

// types
import { Props } from './index';

type ChatBodyProps = Props & {
    typingData?: {
        userTyping: {
            user: {
                username: string;
            };
            isTyping: boolean;
        };
    };
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
            console.log('no new data');
            return;
        }

        // if prev props is falsy then return new state
        if (!prevProps.typingData) {
            console.log('prev props is falsy');
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
            console.log('props didnt change');
            return;
        }

        // when theres no problem
        console.log('no problem state should be changed');
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

    renderItem(props: any) {
        return props.item.messages.map((item: any) => (
            <ChatMsg key={item.id} {...item} />
        ));
    }

    render() {
        console.log('users typing', this.state.usersTyping);

        const data = _.chain(this.props.items)
            .groupBy((item) => new Date(Number(item.timestamp)).toDateString())
            .map((messages, timestamp) => ({ messages, timestamp }))
            .value();

        return (
            <List containerStyle={style.listContainer}>
                <FlatList
                    data={data}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={({ leadingItem }) => (
                        <Hr
                            text={moment(
                                leadingItem.timestamp,
                                'ddd MMM DD YYYY'
                            ).format('D MMM Y')}
                        />
                    )}
                    keyExtractor={(item) => item.timestamp}
                    inverted
                />
            </List>
        );
    }
}
