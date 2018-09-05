import React from 'react';
import { Avatar } from 'react-native-elements';
import { View, Text } from 'react-native';

import { formatDate } from '../../../../lib/helpers';
import {
    chatBodyStyles as styles,
    chatBodyExtra as extraStyles
} from '../styles';

const img = require('../../../../../static/pp.jpg');

interface Props {
    item: {
        from: {
            id: string;
            username: string;
        };
        message: string;
        timestamp: any;
    };
    nextItem: {
        from: {
            id: string;
            username: string;
        };
        message: string;
        timestamp: any;
    };
    currentUser: string;
}

function ChatView({ item, nextItem, currentUser }: Props) {
    const chatContainerStyle = [styles.chatContainer];
    const chatItemStyle = [styles.item];

    if (item.from.username === currentUser) {
        chatContainerStyle.push(extraStyles.chatContainerMe);
        chatItemStyle.push(extraStyles.itemMe);
    } else {
        chatContainerStyle.push(extraStyles.chatContainerElse);
        chatItemStyle.push(extraStyles.itemElse);
    }

    // check if next message is from the same person
    if (nextItem && nextItem.from.username === item.from.username) {
        // join the chats
        if (nextItem.from.username === currentUser) {
            chatItemStyle.push(extraStyles.withNextItemMe);
        } else {
            chatItemStyle.push(extraStyles.withNextItemElse);
        }
        chatContainerStyle.push(extraStyles.withNextCont);
    }

    return (
        <View style={chatContainerStyle}>
            {item.from.username !== currentUser && (
                <Avatar data-testId="avatar" rounded small source={img} />
            )}

            <View style={chatItemStyle}>
                {item.from.username !== currentUser && (
                    <Text style={styles.name}>{item.from.username}</Text>
                )}
                <Text style={styles.text}>{item.message}</Text>
                <Text style={styles.time}>
                    {formatDate(Number(item.timestamp))}
                </Text>
            </View>
        </View>
    );
}

export default ChatView;
