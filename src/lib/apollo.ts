import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { clientId } from './fetch';

export default () => {
    const link = createHttpLink({
        uri: 'http://localhost:3000/graphql'
    });

    const authlink = setContext(async (_, { headers }) => {
        const token = await clientId();
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        };
    });

    const cache = new InMemoryCache();

    const client = new ApolloClient({
        // @ts-ignore
        link: authlink.concat(link),
        cache
    });

    return {
        cache,
        client
    };
};
