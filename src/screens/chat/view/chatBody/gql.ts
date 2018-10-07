import gql from 'graphql-tag';

export const userTypingEvent = gql`
    subscription UserTypingEvent($groupId: String) {
        userTyping(groupId: $groupId) {
            user {
                username
            }
            isTyping
        }
    }
`;
