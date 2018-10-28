import gql from 'graphql-tag';

export const TYPING_SUBSCRIPTION = gql`
    subscription {
        userGroupTyping {
            user {
                username
            }
            group {
                id
                name
            }
            isTyping
        }
    }
`;

export default gql`
    query groups {
        groups {
            id
            name
            unreadCount
            image
            lastMessage {
                id
                message
                timestamp
            }
        }
    }
`;
