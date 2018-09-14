import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
import rootNavigator from './routes';

interface IState {
    isLoaded: boolean;
    isLoggedIn: boolean;
}

export default class App extends React.Component<{}, IState> {
    alert = React.createRef();
    state = {
        isLoaded: false,
        isLoggedIn: false
    };

    async componentDidMount() {
        const token = await AsyncStorage.getItem('client_id');
        const isLoggedIn = token !== null;

        this.setState({
            isLoaded: true,
            isLoggedIn
        });

        MessageBarManager.registerMessageBar(this.alert.current);
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }

    render() {
        const { isLoaded, isLoggedIn } = this.state;

        if (isLoaded) {
            const Navigator = isLoggedIn
                ? rootNavigator('Main')
                : rootNavigator('Login');

            return (
                <React.Fragment>
                    <Navigator />
                    <MessageBar ref={this.alert} />
                </React.Fragment>
            );
        }

        return null;
    }
}
