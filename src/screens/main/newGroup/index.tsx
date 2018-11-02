import * as React from 'react';
import { Mutation, FetchResult } from 'react-apollo';
import { DataProxy } from 'apollo-cache';

import theme from '../../../lib/colors';
import query from '../home/chats/gql';
import { stackStyles } from './style';
import { createGroup } from './gql';
import View from './view';

export default class NewGroup extends React.Component {
    static navigationOptions = {
        title: 'Create a group',
        headerStyle: stackStyles.header,
        headerTitleStyle: stackStyles.title,
        headerTintColor: theme.primary.typo.main
    };

    updateCache = (cache: DataProxy, { data }: FetchResult) => {
        const cacheRes = cache.readQuery({ query });
        if (!cacheRes || !data) {
            return;
        }

        const newGroup = data.createGroup;
        // @ts-ignore
        cacheRes.groups.push(newGroup);

        cache.writeQuery({ query, data: cacheRes });
    };
    render() {
        return (
            <Mutation mutation={createGroup} update={this.updateCache}>
                {(fn, { data }) => <View createGroup={fn} data={data} />}
            </Mutation>
        );
    }
}
