import * as React from 'react';
import {
    createStackNavigator,
    NavigationScreenProps as NP
} from 'react-navigation';
import { ApolloProvider } from 'react-apollo';

// lib
import apolloClient from '../lib/apollo';

// routes
import Home from './home';
import Chat from './chat';
import NewGroup from './newGroup';
import JoinGroup from './joinGroup';

export const MainNavigator = createStackNavigator(
    {
        Home,
        Chat,
        NewGroup,
        JoinGroup
    },
    {
        initialRouteName: 'Home'
    }
);

interface IState {
    isLoaded: boolean;
    client: any;
}

export default class MainRoute extends React.Component<NP, IState> {
    static navigationOptions = {
        header: null
    };
    static router = MainNavigator.router;

    state = {
        isLoaded: false,
        client: null
    };

    async componentDidMount() {
        // setup apollo
        const { client } = await apolloClient();
        this.setState({
            client,
            isLoaded: true
        });
    }

    render() {
        const { isLoaded, client } = this.state;
        if (client && isLoaded) {
            return (
                <ApolloProvider client={client}>
                    <MainNavigator navigation={this.props.navigation} />
                </ApolloProvider>
            );
        }

        return null;
    }
}
