import * as React from 'react';
import ScreenWrapper from '../../components/screenWrapper';
import View from './view';

export default class Main extends React.Component {
    render() {
        return (
            <ScreenWrapper render={() => <View />} screenHeader="Main Page" />
        );
    }
}
