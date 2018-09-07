import * as React from 'react';
import View from './view';

export default class Main extends React.Component {
    static navigationOptions = {
        header: null
    };
    render() {
        // @ts-ignore
        return <View />;
    }
}
