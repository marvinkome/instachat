import * as React from 'react';
import { NavigationScreenProps as NSP } from 'react-navigation';
import { Mutation, FetchResult } from 'react-apollo';
import { DataProxy } from 'apollo-cache';

import query from '../home/chats/gql';
import { joinGroup } from './gql';
import { stackStyles } from './style';
import View from './view';

export default class JoinGroup extends React.Component<NSP> {
    static navigationOptions = {
        title: 'Join a group',
        headerStyle: stackStyles.header,
        headerTitleStyle: stackStyles.title,
        headerTintColor: '#fff'
    };

    onCompleted = (data: Record<string, any>) => {
        if (!data) {
            return this.props.navigation.navigate('Home');
        }

        const groupId = data.joinGroup.id;
        return this.props.navigation.navigate('Chat', { groupId });
    };
    updateCache = (cache: DataProxy, { data }: FetchResult) => {
        const cacheRes = cache.readQuery({ query });
        if (!cacheRes || !data) {
            return;
        }

        const newGroup = data.joinGroup;
        // @ts-ignore
        cacheRes.user.groups.push(newGroup);

        cache.writeQuery({ query, data: cacheRes });
    };
    render() {
        return (
            <Mutation
                mutation={joinGroup}
                update={this.updateCache}
                onCompleted={this.onCompleted}
            >
                {(fn) => <View joinGroup={fn} />}
            </Mutation>
        );
    }
}
