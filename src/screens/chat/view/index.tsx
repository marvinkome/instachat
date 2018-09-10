import * as React from 'react';
import { View, Text } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Query, QueryResult, Mutation, MutationFn } from 'react-apollo';

import ChatHeader from './chatHeader';
import ChatBody from './chatBody';
import ChatForm from './chatForm';
import { viewStyles as styles } from './styles';
import query, { sendMsg, querySubscription } from './gql';
import { SubscribeToMoreOptions } from 'apollo-client';

function subscribeToMessages(
    fn: (options: SubscribeToMoreOptions<any, any>) => void,
    groupId: string
) {
    return fn({
        document: querySubscription,
        variables: { groupId },
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) {
                return prev;
            }

            const newMsg = subscriptionData.data.messageSent;
            const msgList = [...prev.group.messages, newMsg];

            return {
                ...prev,
                group: {
                    ...prev.group,
                    messages: msgList
                }
            };
        }
    });
}

function renderView(
    queryRes: QueryResult<any, any>,
    sendMessage: MutationFn,
    id: string
) {
    const { error, data, loading, subscribeToMore } = queryRes;

    return (
        <View style={styles.container}>
            {error && <Text>{error.message}</Text>}
            {!error &&
                !loading && (
                    <React.Fragment>
                        <ChatHeader
                            data-testId="chat-header"
                            name={data.group.name}
                            groupId={id}
                        />
                        <ChatBody
                            data-testId="chat-body"
                            items={data.group.messages}
                            subscribe={() =>
                                subscribeToMessages(subscribeToMore, id)
                            }
                        />
                        <ChatForm
                            sendMessage={(msg) =>
                                sendMessage({ variables: { groupId: id, msg } })
                            }
                        />
                    </React.Fragment>
                )}
        </View>
    );
}

class ChatView extends React.Component<NavigationInjectedProps> {
    id = this.props.navigation.getParam('groupId');

    render() {
        return (
            <Query query={query} variables={{ id: this.id }}>
                {(queryData) => (
                    <Mutation mutation={sendMsg}>
                        {(sendMessage) =>
                            renderView(queryData, sendMessage, this.id)
                        }
                    </Mutation>
                )}
            </Query>
        );
    }
}

export default withNavigation(ChatView);
