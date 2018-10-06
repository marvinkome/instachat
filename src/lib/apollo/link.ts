// link
import { AsyncStorage } from 'react-native';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { split, from, ApolloLink } from 'apollo-link';
import QueueLink from 'apollo-link-queue';
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
    const errorLink = onError(({ networkError, operation, forward }) => {
        if (networkError) {
            if (operation.operationName === 'SendMessage') {
                console.log('add operation to queue');
                messageQueue
                    .enqueue(
                        // @ts-ignore
                        operation
                    )
                    .then(() => null);
            }
            forward(operation);
        }
    });

    // retry link
    const retryLink = new RetryLink();

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
            return (
                kind === 'OperationDefinition' && operation === 'subscription'
            );
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
