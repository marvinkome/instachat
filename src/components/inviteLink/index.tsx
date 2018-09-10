import * as React from 'react';
import { Mutation } from 'react-apollo';
import { createInvite } from './gql';
import InviteModal from './view';

interface IProps {
    groupId: string;
    enableGroupLink?: boolean;
}

export default class InviteLink extends React.Component<IProps> {
    render() {
        const { groupId, enableGroupLink } = this.props;

        return (
            <Mutation mutation={createInvite} variables={{ groupId }}>
                {(fn) => (
                    <InviteModal
                        groupId={groupId}
                        createInvite={fn}
                        enableGroupLink={enableGroupLink}
                    />
                )}
            </Mutation>
        );
    }
}
