import gql from 'graphql-tag';

export const setTypingState = gql`
    mutation setTypingState($groupId: String!, $state: Boolean!) {
        setTypingState(groupId: $groupId, state: $state)
    }
`;
