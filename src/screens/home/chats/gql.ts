import gql from 'graphql-tag';

// TODO: fix connection directive bug in tests
export default gql`
    query ChatsQuery {
        user {
            id
            groups {
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
    }
`;
