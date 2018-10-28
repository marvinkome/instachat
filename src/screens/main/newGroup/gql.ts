import gql from 'graphql-tag';

export const createGroup = gql`
    mutation CreateGroup($name: String!, $topic: String, $imageUrl: String) {
        createGroup(name: $name, topic: $topic, image: $imageUrl) {
            id
            name
            image
            messages(first: 1, sort: true) {
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
