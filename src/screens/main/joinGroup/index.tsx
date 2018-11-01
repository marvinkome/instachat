import * as React from 'react';
import { NavigationScreenProps as NSP } from 'react-navigation';
import { Mutation, FetchResult } from 'react-apollo';
import { DataProxy } from 'apollo-cache';
import { ApolloError } from 'apollo-client';

import theme from '../../../lib/colors';
import { showAlert } from '../../../lib/helpers';
import query from '../home/chats/gql';
import { joinGroup } from './gql';
import { stackStyles } from './style';
import View from './view';

export default class JoinGroup extends React.Component<NSP> {
    static navigationOptions = {
        title: 'Join a group',
        headerStyle: stackStyles.header,
        headerTitleStyle: stackStyles.title,
        headerTintColor: theme.primary.typo.main
    };

    render() {
        return (
            <Mutation
                mutation={joinGroup}
                onError={this.onError}
                update={this.updateCache}
                onCompleted={this.onCompleted}
            >
                {(fn) => <View joinGroup={fn} />}
            </Mutation>
        );
    }

    private onCompleted = (data: Record<string, any>) => {
        if (!data) {
            return this.props.navigation.navigate('Home');
        }

        const groupId = data.joinGroup.id;
        return this.props.navigation.navigate('Chat', { groupId });
    };
    private onError = (e: ApolloError) => {
        if (/invitation link is bad/i.test(e.message)) {
            return showAlert('Bad invitation link', 'error');
        }

        if (/already in group/i.test(e.message)) {
            return showAlert("You're already in this group", 'error');
        }

        return showAlert('Something went wrong', 'error');
    };
    private updateCache = (cache: DataProxy, { data }: FetchResult) => {
        const cacheRes = cache.readQuery({ query });
        if (!cacheRes || !data) {
            return;
        }

        const newGroup = data.joinGroup;
        // @ts-ignore
        cacheRes.user.groups.push(newGroup);

        cache.writeQuery({ query, data: cacheRes });
    };
}
