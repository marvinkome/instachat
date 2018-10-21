import * as React from 'react';
import { createStackNavigator, NavigationScreenProps as NP } from 'react-navigation';
import notifications, { localNotification } from '../lib/notifications';

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
import EditProfile from './editProfile';

export const MainNavigator = createStackNavigator(
    {
        Home,
        Chat,
        NewGroup,
        JoinGroup,
        EditProfile
    },
    {
        initialRouteName: 'Home'
    }
);

notifications();

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

        // restore cache
        await persistor.restore();
        await persistor.getLogs(true);

        localNotification();
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
