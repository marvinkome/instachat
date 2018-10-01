// link
import { AsyncStorage } from 'react-native';
import { split, from, ApolloLink } from 'apollo-link';
import QueueLink from 'apollo-link-queue';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { RetryLink } from 'apollo-link-retry';
import { QueueMutationLink } from './queueLink';
import withLinkState from './linkState';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default function Link(token: string, cache: InMemoryCache) {
    // logger link
    const logger = new ApolloLink((ops, forward) => {
        if (!forward) {
            return null;
        }
        console.log(ops.operationName);
        return forward(ops);
    });

    // queue links
    const mutationLink = new QueueMutationLink(AsyncStorage);
    const queueLink = new QueueLink();

    // error link
    const errorLink = onError(({ networkError, operation, forward }) => {
        if (networkError) {
            // mutationLink.close();
            // queueLink.close();
            console.log('network error');
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
        // errorLink,
        retryLink,
        // mutationLink,
        // queueLink,
        // logger,
        // withLinkState(cache),
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
        queueLink,
        mutationLink
    };
}
