import gql from 'graphql-tag';

export const userTyping = gql`
    mutation UserTyping($groupId: String!) {
        userTyping(groupId: $groupId) {
            username
        }
    }
`;
