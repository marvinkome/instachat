import gql from 'graphql-tag';

export default gql`
    query {
        user {
            id
            groups {
                id
                name
                messages(first: 1, sort: true) @connection(key: "messages") {
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
