import gql from 'graphql-tag';

export const createGroup = gql`
    mutation CreateGroup($name: String!, $topic: String, $imageUrl: String) {
        createGroup(name: $name, topic: $topic, image: $imageUrl) {
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
