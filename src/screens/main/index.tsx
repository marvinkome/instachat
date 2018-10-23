import * as React from 'react';
import { NavigationScreenProps as NP } from 'react-navigation';

// context providers
import { ApolloProvider } from 'react-apollo';
import { MenuProvider } from 'react-native-popup-menu';

// lib
import apolloClient from '../../lib/apollo';

// navigator
import MainNavigator from './navigator';

interface IState {
    isLoaded: boolean;
    client: any;
}

export default class MainRoute extends React.Component<NP, IState> {
    static navigationOptions = { header: null };
    static router = MainNavigator.router;

    state = {
        isLoaded: false,
        client: null
    };

    async setupApollo() {
        // setup apollo
        const { client, persistor } = await apolloClient();

        // restore cache
        await persistor.restore();
        await persistor.getLogs(true);

        this.setState({
            client,
            isLoaded: true
        });
    }

    async componentDidMount() {
        // setup apollo
        await this.setupApollo();
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
