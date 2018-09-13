import gql from 'graphql-tag';

export const sendMsg = gql`
    mutation SendMessage($groupId: String!, $msg: String!) {
        sendMessage(groupId: $groupId, message: $msg) {
            id
            message
        }
    }
`;

export const querySubscription = gql`
    subscription Messages($groupId: String!) {
        messageSent(groupId: $groupId) {
            id
            message
            timestamp
            from {
                id
                username
            }
        }
    }
`;

export default gql`
    query GroupMessages($id: String!) {
        user {
            id
            username
            userGroup(groupId: $id) {
                group {
                    id
                    name
                    messages {
                        id
                        message
                        timestamp
                        from {
                            id
                            username
                        }
                    }
                }
                role {
                    name
                }
            }
        }
    }
`;
