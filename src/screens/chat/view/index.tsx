import * as React from 'react';
import { View, ToastAndroid } from 'react-native';

import Socket from '../../../lib/socket';
import ChatHeader from './chatHeader';
import ChatBody from './chatBody';
import ChatForm from './chatForm';
import { viewStyles as styles } from './styles';

type IState = {
    messages: Array<{
        name: string;
        text: string;
        time: any;
    }>;
};

class ChatView extends React.Component<{}, IState> {
    socket: SocketIOClient.Socket;
    state = {
        messages: []
    };

    async componentDidMount() {
        this.socket = await Socket();

        // join a room
        this.socket.emit('join_room', 'Test Room');

        // listen for messages
        this.socket.on('message', (msg: any) => {
            // check if message is not from bot
            if (msg.data) {
                // listen for messages from users
                this.setState({
                    messages: this.state.messages.concat(msg.data)
                });
            } else {
                // listen for changes then alert
                ToastAndroid.show(msg, ToastAndroid.LONG);
            }
        });
    }

    sendMessage = (message: string) => {
        this.socket.send(message, 'Test Room');
    };

    render() {
        return (
            <View style={styles.container}>
                <ChatHeader data-testId="chat-header" />
                <ChatBody data-testId="chat-body" items={this.state.messages} />
                <ChatForm sendMessage={this.sendMessage} />
            </View>
        );
    }
}

export default ChatView;
