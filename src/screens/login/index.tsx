import * as React from 'react';
import View from './view';
import SplashScreen from 'react-native-splash-screen';

export default class Main extends React.Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        SplashScreen.hide();
    }
    render() {
        return <View />;
    }
}
