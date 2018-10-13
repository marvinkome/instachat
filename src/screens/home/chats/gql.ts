import gql from 'graphql-tag';

// TODO: fix connection directive bug in tests
export default gql`
    query groups {
        groups {
            id
            name
            unreadCount
            lastMessage {
                id
                message
                timestamp
            }
        }
    }
`;
