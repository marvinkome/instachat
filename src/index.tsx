import * as React from 'react';
import { YellowBox, StatusBar } from 'react-native';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
import theme from './lib/colors';
import Navigation from './lib/navigationService';
import RootNavigator from './screens';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.ignoredYellowBox = ['Setting a timer'];

interface IState {
    isLoaded: boolean;
    isLoggedIn: boolean;
}

export default class App extends React.Component<{}, IState> {
    alert = React.createRef();

    componentDidMount() {
        MessageBarManager.registerMessageBar(this.alert.current);
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar barStyle="light-content" backgroundColor={theme.primary.light} />
                <RootNavigator ref={(ref: any) => Navigation.setContainer(ref)} />
                <MessageBar ref={this.alert} />
            </React.Fragment>
        );
    }
}
