import * as React from 'react';
import {
    createStackNavigator,
    NavigationScreenProps as NP
} from 'react-navigation';
import { NetInfo } from 'react-native';

// context providers
import { ApolloProvider } from 'react-apollo';
import { MenuProvider } from 'react-native-popup-menu';

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
        const { client, persistor } = await apolloClient();

        // check if user is online
        const online = await NetInfo.isConnected.fetch();

        // if user is not online restore from cache
        if (!online) {
            await persistor.restore();
            console.warn('data from cache');
        }

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
                    <MenuProvider>
                        <MainNavigator navigation={this.props.navigation} />
                    </MenuProvider>
                </ApolloProvider>
            );
        }

        return null;
    }
}
