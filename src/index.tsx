import * as React from 'react';
import { YellowBox } from 'react-native';
import Screen from './screens';

YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader'
]);

export default class App extends React.Component {
    render() {
        return <Screen />;
    }
}
