import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import ChatItem from './chatItem';
import { chatBodyStyles as styles } from '../styles';

interface Props {
    loggedUser: string;
    items: Array<{
        id: string;
        from: {
            id: string;
            username: string;
        };
        message: string;
        timestamp: any;
    }>;
}

export default class ChatBody extends React.Component<Props> {
    scrollView: any;
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
                onContentSizeChange={() => {
                    this.scrollView.scrollToEnd({ animated: false });
                }}
            >
                {this.props.items.map((item, index, array) => (
                    <ChatItem
                        item={item}
                        nextItem={array[index + 1]}
                        currentUser={this.props.loggedUser}
                        key={item.id}
                    />
                ))}
            </ScrollView>
        );
    }
}
