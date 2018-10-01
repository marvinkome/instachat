import * as React from 'react';
import { NavigationScreenProps as NSP } from 'react-navigation';
import { Query, Mutation, FetchResult, MutationFn } from 'react-apollo';
import { SubscribeToMoreOptions as STMO, ApolloClient } from 'apollo-client';

import { showAlert, createOptimisticResp } from '../../lib/helpers';
import View from './view';
import query, { sendMsg, querySubscription, addError } from './gql';
import { DataProxy } from 'apollo-cache';

interface SendMessageArgs {
    groupId: string;
    msg: string;
    username: string;
}
export default class Main extends React.Component<NSP> {
    static navigationOptions = {
        header: null
    };

    optimisticResp: any;
    mutationClient: ApolloClient<object>;
    id = this.props.navigation.getParam('groupId');

    subscribeToMessages = (fn: (options: STMO<any, any>) => void) => {
        fn({
            document: querySubscription,
            variables: { groupId: this.id },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData) {
                    return prev;
                }

                const newMsg = subscriptionData.data.messageSent;

                // if it's same user dont
                if (prev.user.username === newMsg.from.username) {
                    return prev;
                }

                const prevGroup = prev.user.userGroup.group;
                const msgList = [newMsg, ...prevGroup.messages];

                return {
                    ...prev,
                    user: {
                        ...prev.user,
                        userGroup: {
                            ...prev.user.userGroup,
                            group: {
                                ...prev.user.userGroup.group,
                                messages: msgList
                            }
                        }
                    }
                };
            }
            // onError: (err) => console.log(err)
        });
    };

    sendMessage(fn: MutationFn, { msg, groupId, ...args }: SendMessageArgs) {
        console.log('sending msg');
        // create optimistic resp
        this.optimisticResp = createOptimisticResp(msg, args.username, true);
        fn({
            variables: { groupId, msg },
            optimisticResponse: this.optimisticResp
        });
    }

    update = (cache: any, { data }: FetchResult) => {
        const prev = cache.readQuery({ query, variables: { id: this.id } });
        if (!data || !prev) {
            return;
        }

        console.log('update called');

        // @ts-ignore
        const { user } = prev;
        user.group.messages.unshift(data.sendMessage);

        cache.writeQuery({ query, data: { user } });
    };

    onError = () => {
        console.log('mutation failed');
        this.mutationClient.mutate({
            mutation: addError,
            variables: {
                groupId: this.id,
                msg: this.optimisticResp.sendMessage.message,
                user: this.optimisticResp.sendMessage.from.username
            },
            update: (cache, { data }) => {
                const prev = cache.readQuery({
                    query,
                    variables: { id: this.id }
                });

                if (!data || !prev) {
                    return;
                }

                console.log('update called');

                // @ts-ignore
                const { user } = prev;
                user.group = {
                    ...user.group,
                    messages: data.addErrorMessage.data.group.messages
                };

                cache.writeQuery({ query, data: { user } });
                // cache.readQuery({ query, variables: { id: this.id } });
            }
        });
        return null;
    };

    renderMutation(props: any) {
        return (
            <Mutation
                mutation={sendMsg}
                update={this.update}
                onError={this.onError}
            >
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
                            this.subscribeToMessages(subscribeToMore);

                        return this.renderMutation(props);
                    }

                    return null;
                }}
            </Query>
        );
    }
}
