import ApolloClient from 'apollo-client';
import { AsyncStorage } from 'react-native';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';
import { clientId } from './helpers';

export default async () => {
    const token = await clientId();

    // http link
    const httpLink = createHttpLink({
        uri: 'http://localhost:3000/graphql'
    });
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        };
    }).concat(httpLink);

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
        authLink
    );

    const cache = new InMemoryCache({
        cacheRedirects: {
            User: {
                group: (_, args, { getCacheKey }) =>
                    getCacheKey({ __typename: 'Group', id: args.groupId })
            }
        }
    });

    const client = new ApolloClient({
        link,
        cache
    });

    const persistor = new CachePersistor({
        cache,
        storage: AsyncStorage
    });

    return {
        cache,
        client,
        persistor
    };
};
