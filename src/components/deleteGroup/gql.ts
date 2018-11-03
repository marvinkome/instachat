import gql from 'graphql-tag';

export const DELETE_GROUP = gql`
    mutation deleteGroup($groupId: String!) {
        deleteGroup(groupId: $groupId)
    }
`;
