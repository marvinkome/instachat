import * as React from 'react';
import { Avatar } from 'react-native-elements';
import { View, Text, ScrollView } from 'react-native';

import { formatDate } from '../../../lib/helpers';
import {
    chatBodyStyles as styles,
    chatBodyExtra as extraStyles
} from './styles';

const img = require('../../../../static/pp.jpg');

type Props = {
    items: Array<{
        name: string;
        text: string;
        time: any;
    }>;
};

export class ChatBody extends React.Component<Props> {
    scrollView: any;
    renderChatItem = (item: any, index: number, nextItem: any) => {
        const chatContainerStyle = [styles.chatContainer];
        const chatItemStyle = [styles.item];

        if (item.name === 'you') {
            chatContainerStyle.push(extraStyles.chatContainerMe);
            chatItemStyle.push(extraStyles.itemMe);
        } else {
            chatContainerStyle.push(extraStyles.chatContainerElse);
            chatItemStyle.push(extraStyles.itemElse);
        }

        // check if next message is from the same person
        if (nextItem && nextItem.name === item.name) {
            // join the chats
            if (nextItem.name === 'you') {
                chatItemStyle.push(extraStyles.withNextItemMe);
            } else {
                chatItemStyle.push(extraStyles.withNextItemElse);
            }
            chatContainerStyle.push(extraStyles.withNextCont);
        }

        return (
            <View style={chatContainerStyle} key={index}>
                {item.name !== 'you' && (
                    <Avatar data-testId="avatar" rounded small source={img} />
                )}

                <View style={chatItemStyle}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                    <Text style={styles.time}>{formatDate(item.time)}</Text>
                </View>
            </View>
        );
    };
    newMessageIndicator = () => {
        return (
            <View style={styles.newMsg}>
                <Text style={styles.newMsgText}>New Message</Text>
            </View>
        );
    };
    render() {
        return (
            <ScrollView
                style={styles.container}
                ref={(ref: any) => (this.scrollView = ref)}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    this.scrollView.scrollToEnd({ animated: false });
                }}
            >
                {this.props.items.map((item, index, array) =>
                    this.renderChatItem(item, index, array[index + 1])
                )}
            </ScrollView>
        );
    }
}
