import * as React from 'react';

// Apollo
import { ApolloClient } from 'apollo-client';
import { Query, Mutation, MutationFn } from 'react-apollo';
import { ALL_MESSAGES, SEND_MESSAGE } from './gql';

// types
import { NavigationScreenProps } from 'react-navigation';
import { ViewProps, messageParam } from './types';

// helpers
import { showAlert } from '../../lib/helpers';
import * as utils from './utils';

// UI
import View from './view';

class ChatScreen extends React.Component<NavigationScreenProps> {
    static navigationOptions = {
        header: null
    };

    // params from router
    groupId = this.props.navigation.getParam('groupId');
    client: ApolloClient<object>;
    optimisticResp: any;
    errorId: number;

    sendMessage = (fn: MutationFn, args: messageParam) => {
        const { optimisticResp, errorId } = utils.sendMessage(fn, args);
        this.optimisticResp = optimisticResp;
        this.errorId = errorId;
    };

    onError = () => {
        const variables = {
            errorId: this.errorId,
            groupId: this.groupId,
            msg: this.optimisticResp.sendMessage.message,
            user: this.optimisticResp.sendMessage.from.username,
            userId: this.optimisticResp.sendMessage.from.id
        };

        utils.onError(this.client, variables);
    };

    renderMutation(props: ViewProps) {
        const mutationProps = {
            mutation: SEND_MESSAGE,
            update: (cache: any, res: any) =>
                utils.update(cache, res, this.groupId),
            onError: this.onError
        };

        return (
            <Mutation {...mutationProps}>
                {(fn, { client }) => {
                    this.client = client;

                    props.sendMsg = (obj: messageParam) =>
                        this.sendMessage(fn, obj);

                    return <View {...props} />;
                }}
            </Mutation>
        );
    }
    render() {
        // @ts-ignore
        const viewProps: ViewProps = {};
        const queryProps: any = {
            query: ALL_MESSAGES,
            variables: { groupID: this.groupId },
            fetchPolicy: 'cache-and-network'
        };

        return (
            <Query {...queryProps}>
                {({ error, data, ...rest }) => {
                    if (error && !data) {
                        showAlert('Something is wrong', 'error');
                        return null;
                    }

                    if (data && data.user && data.group) {
                        viewProps.user = data.user;
                        viewProps.group = data.group;
                        viewProps.subscribe = () =>
                            utils.subscribeToMessages(
                                this.groupId,
                                rest.subscribeToMore
                            );

                        return this.renderMutation(viewProps);
                    }

                    return null;
                }}
            </Query>
        );
    }
}

export default ChatScreen;
