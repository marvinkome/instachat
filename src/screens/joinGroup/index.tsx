import * as React from 'react';
import { Mutation } from 'react-apollo';

import { joinGroup } from './gql';
import { stackStyles } from './style';
import View from './view';

export default class JoinGroup extends React.Component {
    static navigationOptions = {
        title: 'Join a group',
        headerStyle: stackStyles.header,
        headerTitleStyle: stackStyles.title,
        headerTintColor: '#fff'
    };
    render() {
        return (
            <Mutation mutation={joinGroup}>
                {(fn) => <View joinGroup={fn} />}
            </Mutation>
        );
    }
}
