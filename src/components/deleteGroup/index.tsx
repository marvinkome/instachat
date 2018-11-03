import * as React from 'react';
import { Mutation } from 'react-apollo';
import ChatsQuery from '../../screens/main/home/chats/gql';
import { DELETE_GROUP } from './gql';
import DeleteModal from './view';
import { DataProxy } from 'apollo-cache';

interface IProps {
    groupId: string;
    isOpen: boolean;
    toggle: () => void;
}

export default class DeleteGroup extends React.Component<IProps> {
    updateCache = (cache: DataProxy) => {
        const cacheRes = cache.readQuery({ query: ChatsQuery });
        if (!cacheRes) {
            return;
        }

        // @ts-ignore
        const newGroup = cacheRes.groups.filter((item: any) => item.id !== this.props.groupId);
        // @ts-ignore
        cacheRes.groups = newGroup;
        cache.writeQuery({ query: ChatsQuery, data: cacheRes });
    };
    render() {
        const { groupId } = this.props;

        return (
            <Mutation update={this.updateCache} mutation={DELETE_GROUP} variables={{ groupId }}>
                {(fn) => <DeleteModal {...this.props} deleteFn={fn} />}
            </Mutation>
        );
    }
}
