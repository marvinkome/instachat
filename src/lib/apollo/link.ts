// link
import { AsyncStorage, ToastAndroid } from 'react-native';
import Navigation from '../navigationService';

import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { split, from, ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { RetryLink } from 'apollo-link-retry';
import { MessageQueue } from './messageQueue';
import withLinkState from './linkState';

export default function Link(token: string, cache: InMemoryCache) {
    // logger
    const logger = new ApolloLink((ops, forward) => {
        console.log(ops.operationName);
        // @ts-ignore
        return forward(ops);
    });

    // queue links
    const messageQueue = new MessageQueue(AsyncStorage);

    // error link
    const errorLink = onError(({ networkError, operation, forward, graphQLErrors }) => {
        if (graphQLErrors) {
            graphQLErrors.map((err) => {
                if (err.message.match(/can't authenticate/i)) {
                    ToastAndroid.show('Authentication error', ToastAndroid.SHORT);
                    Navigation.navigate('Logout');
                }
            });
        }
        if (networkError) {
            if (operation.operationName === 'sendMessage') {
                messageQueue
                    .enqueue(
                        // @ts-ignore
                        operation
                    )
                    .then(() => null);
            }

            if (operation.operationName !== 'setTypingState') {
                return console.log(networkError);
            }

            forward(operation);
        }
    });

    // retry link
    const retryLink = new RetryLink({
        attempts: {
            retryIf(err, ops) {
                return ops.operationName !== 'setTypingState' && !!err;
            }
        }
    });

    // auth link
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        };
    });

    // network link
    const networkLink = createHttpLink({
        uri: 'http://localhost:3000/graphql'
    });

    // http link
    // @ts-ignore
    const httpLink = from([
        errorLink,
        retryLink,
        // mutationLink,
        // queueLink,
        logger,
        withLinkState(cache),
        authLink,
        networkLink
    ]);

    // ws link
    const wsLink = new WebSocketLink({
        uri: 'ws://localhost:3000/graphql',
        options: {
            reconnect: true,
            connectionParams: {
                authToken: token
            }
        }
    });

    // filter link
    const link = split(
        ({ query }) => {
            // @ts-ignore
            const { kind, operation } = getMainDefinition(query);
            return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        httpLink
    );

    return {
        link,
        messageQueue
        // mutationLink
    };
}
