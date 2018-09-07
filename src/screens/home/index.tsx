import * as React from 'react';
import {
    createMaterialTopTabNavigator,
    NavigationScreenProps
} from 'react-navigation';
import { ApolloProvider } from 'react-apollo';
import apolloClient from '../../lib/apollo';

// styles
import color from '../../lib/colors';
import { tabStyles, stackStyles } from '../../styles';

// home tabs
import { Chats } from './chats';
import { Profile } from './profile';

const HomeTabNavigator = createMaterialTopTabNavigator(
    {
        Chats,
        Profile
    },
    {
        tabBarOptions: {
            style: tabStyles.background,
            labelStyle: tabStyles.label,
            indicatorStyle: tabStyles.indicator,
            activeTintColor: color.primary,
            inactiveTintColor: color.text_title
        }
    }
);

interface IState {
    isLoaded: boolean;
    client: any;
}

export default class Main extends React.Component<
    NavigationScreenProps,
    IState
> {
    static navigationOptions = {
        title: 'Chat App'.toUpperCase(),
        headerStyle: stackStyles.header,
        headerTitleStyle: stackStyles.title,
        headerLeft: null
    };
    static router = HomeTabNavigator.router;

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
                    <HomeTabNavigator navigation={this.props.navigation} />
                </ApolloProvider>
            );
        }

        return null;
    }
}
