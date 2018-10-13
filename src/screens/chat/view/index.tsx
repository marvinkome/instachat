import * as React from 'react';
import { View } from 'react-native';

import ChatHeader from './chatHeader';
import ChatBody from './chatBody';
import ChatForm from './chatForm';

import { viewStyles as styles } from './styles';
import { ViewProps } from '../types';

export const PageView = (props: ViewProps) => {
    const role = props.group.role;
    const username = props.user.username;
    const userId = props.user.id;

    return (
        <View style={styles.container}>
            <ChatHeader
                data-testId="chat-header"
                name={props.group.name}
                role={role.name}
                groupId={props.group.id}
            />
            <ChatBody
                data-testId="chat-body"
                items={props.group.messages}
                groupId={props.group.id}
                subscribe={props.subscribe || (() => null)}
            />
            <ChatForm
                groupId={props.group.id}
                sendMessage={(msg) =>
                    props.sendMsg({
                        groupId: props.group.id,
                        msg,
                        userId,
                        username
                    })
                }
            />
        </View>
    );
};

export default PageView;
