import * as React from 'react';
import { StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import Main from './screens/main';

export default class App extends React.Component {
    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Main />
            </StyleProvider>
        );
    }
}
