import * as React from 'react';
import { View } from 'react-native';
import { MutationFn } from 'react-apollo';

import ChatHeader from './chatHeader';
import ChatBody from './chatBody';
import ChatForm from './chatForm';

import { viewStyles as styles } from './styles';

interface IProps {
    data: any;
    sendMsg: MutationFn;
    groupId: string;
    moreMessages: () => void;
}

const optimisticResp = (message: string, username: string) => ({
    sendMessage: {
        id: String(Math.round(Math.random() * -1000000)),
        message,
        timestamp: Date.now(),
        from: {
            id: String(Math.round(Math.random() * -1000000)),
            username,
            __typename: 'User'
        },
        __typename: 'Message'
    }
});

export const PageView = ({ data, sendMsg, groupId, moreMessages }: IProps) => {
    const group = data.user.group;
    const role = data.user.group.role;
    const username = data.user.username;
    return (
        <View style={styles.container}>
            <ChatHeader
                data-testId="chat-header"
                name={group.name}
                role={role.name}
                groupId={groupId}
            />
            <ChatBody
                data-testId="chat-body"
                loggedUser={username}
                items={group.messages}
                subscribe={moreMessages}
            />
            <ChatForm
                sendMessage={(msg) =>
                    sendMsg({
                        variables: { groupId, msg },
                        optimisticResponse: optimisticResp(msg, username)
                    })
                }
            />
        </View>
    );
};

export default PageView;
