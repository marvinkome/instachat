import gql from 'graphql-tag';

export const createGroup = gql`
    mutation CreateGroup($name: String!, $topic: String) {
        createGroup(name: $name, topic: $topic) {
            id
            name
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
