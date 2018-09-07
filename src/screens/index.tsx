import * as React from 'react';
import { AsyncStorage } from 'react-native';
import rootNavigator from './routes';

interface IState {
    isLoaded: boolean;
    isLoggedIn: boolean;
}

export default class App extends React.Component<{}, IState> {
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
    }

    render() {
        const { isLoaded, isLoggedIn } = this.state;

        if (isLoaded) {
            const Navigator = isLoggedIn
                ? rootNavigator('Home')
                : rootNavigator('Login');

            return <Navigator />;
        }

        return null;
    }
}
