import * as React from 'react';
// import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';
// import { navOptions } from '../../components/screenWrapper';
// import View from './view';

export default class Main extends React.Component {
    render() {
        return (
            <Header
                centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
            />
        );
    }
}
