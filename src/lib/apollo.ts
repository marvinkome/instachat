import ApolloClient from 'apollo-boost';
import fetch from './fetch';

export default () => {
    return new ApolloClient({
        uri: 'http://localhost:5000/graphql',
        fetch
    });
};
