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
import { DefaultOptions } from 'apollo-client/ApolloClient';

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all'
    },
    query: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all'
    },
    mutate: {
        errorPolicy: 'all'
    }
};

async function Link() {
    const token = await clientId();

    // http link
    const httpLink = createHttpLink({
        uri: 'http://localhost:3000/graphql'
    });

    // auth link
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

    return link;
}

export default async () => {
    const cache = new InMemoryCache({
        cacheRedirects: {
            User: {
                group: (_, args, { getCacheKey }) =>
                    getCacheKey({ __typename: 'Group', id: args.groupId })
            }
        }
    });

    const persistor = new CachePersistor({
        cache,
        storage: AsyncStorage
    });

    const link = await Link();

    const client = new ApolloClient({
        link,
        cache,
        defaultOptions
    });

    return {
        cache,
        client,
        persistor
    };
};
