import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import firebase, { RNFirebase } from 'react-native-firebase';
import { NavigationScreenProps as NP } from 'react-navigation';

// context providers
import { ApolloProvider } from 'react-apollo';
import { MenuProvider } from 'react-native-popup-menu';

// lib
import apolloClient from '../../lib/apollo';
import theme from '../../lib/colors';

// navigator
import MainNavigator from './navigator';

interface IState {
    isLoaded: boolean;
    client: any;
}

export default class MainRoute extends React.Component<NP, IState> {
    static navigationOptions = { header: null };
    static router = MainNavigator.router;
    notificationOpened: any;

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

    async setupNotifications() {
        const messaging = firebase.messaging();
        const enabled = await messaging.hasPermission();
        if (!enabled) {
            try {
                await messaging.requestPermission();
            } catch (e) {
                return;
            }
        }

        // when app is opened by a notification
        const notifOpened = await firebase.notifications().getInitialNotification();
        if (notifOpened) {
            // initial open
            // process notification
            this.processNotification(notifOpened.notification);
        }
        this.notificationOpened = firebase.notifications().onNotificationOpened((notif) => {
            // background/foreground
            // process notification
            this.processNotification(notif.notification);
        });
    }

    async processNotification(notif: RNFirebase.notifications.Notification) {
        const groupId = notif.data.group;
        this.props.navigation.navigate('Chat', { groupId });
    }

    async componentDidMount() {
        // setup apollo
        await this.setupApollo();

        // setup notifications
        await this.setupNotifications();
    }

    componentWillUnmount() {
        this.notificationOpened();
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

        return (
            <View
                style={{
                    backgroundColor: theme.primary.regular,
                    flex: 1,
                    justifyContent: 'center'
                }}
            >
                <ActivityIndicator size="large" color={theme.secondary.regular} />
            </View>
        );
    }
}
