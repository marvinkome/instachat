import gql from 'graphql-tag';

export const createInvite = gql`
    mutation CreateInvite($groupId: String!) {
        createInvite(groupId: $groupId)
    }
`;
