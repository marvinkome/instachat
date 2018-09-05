import * as React from 'react';
import { View, Text } from 'react-native';
import { Query, QueryResult } from 'react-apollo';

import ChatHeader from './chatHeader';
import ChatBody from './chatBody';
import ChatForm from './chatForm';
import { viewStyles as styles } from './styles';
import query from './gql';

class ChatView extends React.Component {
    sendMessage = (message: string) => {
        // this.socket.send(message, 'Test Room');
    };

    renderView = ({ data, loading, error }: QueryResult<any, any>) => {
        return (
            <View style={styles.container}>
                <ChatHeader data-testId="chat-header" />
                {error && <Text>{error.message}</Text>}
                {!error &&
                    !loading && (
                        <ChatBody
                            data-testId="chat-body"
                            items={data.group.messages}
                        />
                    )}
                <ChatForm sendMessage={this.sendMessage} />
            </View>
        );
    };

    render() {
        return (
            <Query query={query} variables={{ id: '5b8d9f2f53f8f92191b8a32b' }}>
                {(data) => this.renderView(data)}
            </Query>
        );
    }
}

export default ChatView;
