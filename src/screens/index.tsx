import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AsyncStorage } from 'react-native';
import client from '../lib/apollo';
import rootNavigator from './routes';

type IState = {
    isLoaded: boolean;
    isLoggedIn: boolean;
};

export default class App extends React.Component<{}, IState> {
    state = {
        isLoaded: false,
        isLoggedIn: false
    };

    async componentDidMount() {
        const token = await AsyncStorage.getItem('client_id');
        this.setState({
            isLoaded: true,
            isLoggedIn: token !== null
        });
    }

    render() {
        const Navigator = this.state.isLoggedIn
            ? rootNavigator('Home')
            : rootNavigator('Login');
        return this.state.isLoaded ? (
            <ApolloProvider client={client()}>
                <Navigator />
            </ApolloProvider>
        ) : null;
    }
}
