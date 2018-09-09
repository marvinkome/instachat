import * as React from 'react';
import { Mutation } from 'react-apollo';
import { createInvite } from './gql';
import InviteModal from './view';

interface IProps {
    groupId: string;
}

export default class InviteLink extends React.Component<IProps> {
    render() {
        const groupId = this.props.groupId;
        return (
            <Mutation mutation={createInvite} variables={{ groupId }}>
                {(fn) => <InviteModal groupId={groupId} createInvite={fn} />}
            </Mutation>
        );
    }
}
