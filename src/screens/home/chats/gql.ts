import gql from 'graphql-tag';

export default gql`
    query ChatsQuery {
        user {
            id
            groups {
                id
                name
                messages(first: 1, sort: true)
                    @connection(key: "messages", filter: ["sort"]) {
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
