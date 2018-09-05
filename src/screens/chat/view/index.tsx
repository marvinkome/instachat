import * as React from 'react';
import { View, Text } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Query, QueryResult, Mutation, MutationFn } from 'react-apollo';

import ChatHeader from './chatHeader';
import ChatBody from './chatBody';
import ChatForm from './chatForm';
import { viewStyles as styles } from './styles';
import query, { sendMsg } from './gql';

class ChatView extends React.Component<NavigationInjectedProps> {
    id = this.props.navigation.getParam('groupId');

    renderView = (
        { data, loading, error }: QueryResult<any, any>,
        sendMessage: MutationFn
    ) => {
        const id = this.props.navigation.getParam('groupId');
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
                <ChatForm
                    sendMessage={(msg) =>
                        sendMessage({ variables: { groupId: this.id, msg } })
                    }
                />
            </View>
        );
    };

    render() {
        return (
            <Query query={query} variables={{ id: this.id }}>
                {(queryData) => (
                    <Mutation mutation={sendMsg}>
                        {(sendMessage) =>
                            this.renderView(queryData, sendMessage)
                        }
                    </Mutation>
                )}
            </Query>
        );
    }
}

export default withNavigation(ChatView);
