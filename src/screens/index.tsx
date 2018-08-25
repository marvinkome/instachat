import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AsyncStorage } from 'react-native';
import { persistCache } from 'apollo-cache-persist';
import apolloClient from '../lib/apollo';
import rootNavigator from './routes';

type IState = {
    client: any;
    isLoaded: boolean;
    isLoggedIn: boolean;
};

export default class App extends React.Component<{}, IState> {
    state = {
        client: null,
        isLoaded: false,
        isLoggedIn: false
    };

    async componentDidMount() {
        const token = await AsyncStorage.getItem('client_id');
        const { cache, client } = apolloClient();
        await persistCache({ cache, storage: AsyncStorage });
        const isLoggedIn = token !== null;

        this.setState({
            client,
            isLoaded: true,
            isLoggedIn
        });
    }

    render() {
        const { client, isLoaded, isLoggedIn } = this.state;
        const Navigator = isLoggedIn
            ? rootNavigator('Home')
            : rootNavigator('Login');

        if (isLoaded && client) {
            return (
                <ApolloProvider client={client}>
                    <Navigator />
                </ApolloProvider>
            );
        }

        return null;
    }
}
