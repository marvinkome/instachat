import gql from 'graphql-tag';

export const addError = gql`
    mutation AddErrorMessage(
        $errorId: Int
        $groupId: String!
        $msg: String!
        $user: String!
        $userId: String!
    ) {
        addErrorMessage(
            errorId: $errorId
            groupId: $groupId
            msg: $msg
            user: $user
            userId: $userId
        ) @client
    }
`;

export const sendMsg = gql`
    mutation SendMessage($groupId: String!, $msg: String!) {
        sendMessage(groupId: $groupId, message: $msg) {
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
            group(groupId: $id) {
                id
                name
                messages(sort: true, first: 15) {
                    id
                    message
                    timestamp
                    from {
                        id
                        username
                    }
                }
                role {
                    name
                }
            }
        }
    }
`;
