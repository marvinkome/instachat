import gql from 'graphql-tag';

export const joinGroup = gql`
    mutation joinGroup($invite: String!) {
        joinGroup(inviteId: $invite) {
            id
            name
            unreadCount
            image
            lastMessage {
                id
                message
                timestamp
            }
            role {
                name
            }
        }
    }
`;
