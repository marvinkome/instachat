import * as React from 'react';
import { View } from 'react-native';

import Socket from '../../../lib/socket';
import { ChatHeader } from './chatHeader';
import { ChatBody } from './chatBody';
import { ChatForm } from './chatForm';
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

    componentDidMount() {
        this.socket = Socket();

        this.socket.on('message response', (data: any) => {
            this.setState({
                messages: this.state.messages.concat(data)
            });
        });
    }

    sendMessage = (message: string) => {
        this.socket.emit('send message', message);
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
