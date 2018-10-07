import * as React from 'react';
import { View } from 'react-native';

import ChatHeader from './chatHeader';
import ChatBody from './chatBody';
import ChatForm from './chatForm';

import { viewStyles as styles } from './styles';

interface IProps {
    data: any;
    sendMsg: (
        obj: { groupId: string; msg: string; username: string; userId: string }
    ) => void;
    groupId: string;
    moreMessages?: () => void;
}

export const PageView = ({ data, sendMsg, groupId, moreMessages }: IProps) => {
    const group = data.user.group;
    const role = data.user.group.role;
    const username = data.user.username;
    const userId = data.user.id;
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
                items={group.messages}
                groupId={groupId}
                subscribe={moreMessages || (() => null)}
            />
            <ChatForm
                groupId={groupId}
                sendMessage={(msg) =>
                    sendMsg({ groupId, msg, username, userId })
                }
            />
        </View>
    );
};

export default PageView;
