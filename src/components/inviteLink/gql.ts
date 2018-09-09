import gql from 'graphql-tag';

export const createInvite = gql`
    mutation CreateGroup($groupId: String!) {
        createInvite(groupId: $groupId)
    }
`;
