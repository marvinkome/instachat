import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from './fetch';

export default () => {
    const cache = new InMemoryCache();

    const client = new ApolloClient({
        uri: 'http://localhost:5000/graphql',
        fetch,
        cache
    });

    return {
        cache,
        client
    };
};
