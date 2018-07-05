import * as React from 'react';
import { navOptions } from '../../components/screenWrapper';
import View from './view';

export default class Main extends React.Component {
    static navigationOptions = navOptions;
    render() {
        return <View />;
    }
}
