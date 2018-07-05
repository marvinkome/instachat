import * as React from 'react';
import { StyleProvider } from 'native-base';
import { YellowBox } from 'react-native';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import Screens from './screens';

YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader'
]);

export default class App extends React.Component {
    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Screens />
            </StyleProvider>
        );
    }
}
