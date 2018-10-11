import gql from 'graphql-tag';

// TODO: fix connection directive bug in tests
export default gql`
    query groups($lastMessageTimestamp: String!) {
        groups {
            id
            name
            numberOfNewMessages(messageTimestamp: $lastMessageTimestamp)
            lastMessage {
                id
                message
                timestamp
            }
        }
    }
`;
