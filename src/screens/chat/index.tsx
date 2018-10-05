import * as React from 'react';
import { NavigationScreenProps as NSP } from 'react-navigation';

// graphql
import { Query, Mutation, MutationFn } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import query, { sendMsg } from './gql';

// UI
import View from './view';

// utils
import { showAlert } from '../../lib/helpers';
import {
    subscribeToMessages,
    sendMessage,
    update,
    onError,
    SendMessageArgs
} from './utils';

export default class Main extends React.Component<NSP> {
    static navigationOptions = {
        header: null
    };

    id = this.props.navigation.getParam('groupId');

    optimisticResp: any;
    errorId: number;
    mutationClient: ApolloClient<object>;

    sendMessage = (fn: MutationFn, args: SendMessageArgs) => {
        const { optimisticResp, errorId } = sendMessage(fn, args);
        this.optimisticResp = optimisticResp;
        this.errorId = errorId;
    };

    onError = () => {
        const variables = {
            errorId: this.errorId,
            groupId: this.id,
            msg: this.optimisticResp.sendMessage.message,
            user: this.optimisticResp.sendMessage.from.username,
            userId: this.optimisticResp.sendMessage.from.id
        };

        onError(this.mutationClient, variables);
    };

    renderMutation(props: any) {
        const mutationProps = {
            mutation: sendMsg,
            update: (cache: any, res: any) => update(cache, res, this.id),
            onError: this.onError
        };

        return (
            <Mutation {...mutationProps}>
                {(fn, { error, client }) => {
                    this.mutationClient = client;
                    props.sendMsg = (obj: SendMessageArgs) =>
                        this.sendMessage(fn, obj);

                    return <View {...props} />;
                }}
            </Mutation>
        );
    }

    render() {
        return (
            <Query query={query} variables={{ id: this.id }}>
                {({ error, data, subscribeToMore }) => {
                    if (error && !data) {
                        console.error(error);
                        showAlert('Something is wrong', 'error');
                        return null;
                    }

                    if (data && data.user) {
                        const props: any = {
                            data,
                            groupId: this.id
                        };

                        props.moreMessages = () =>
                            subscribeToMessages(this.id, subscribeToMore);

                        return this.renderMutation(props);
                    }

                    return null;
                }}
            </Query>
        );
    }
}
