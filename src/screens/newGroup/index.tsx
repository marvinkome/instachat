import * as React from 'react';
import { stackStyles } from './style';
import View from './view';

export default class NewGroup extends React.Component {
    static navigationOptions = {
        title: 'Create a group',
        headerStyle: stackStyles.header,
        headerTitleStyle: stackStyles.title,
        headerTintColor: '#fff'
    };
    render() {
        return <View />;
    }
}
