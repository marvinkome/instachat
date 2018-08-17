import * as React from 'react';
import { AsyncStorage } from 'react-native';
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
        return this.state.isLoaded ? <Navigator /> : null;
    }
}
