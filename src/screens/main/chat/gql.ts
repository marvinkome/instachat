import gql from 'graphql-tag';

export const ALL_MESSAGES = gql`
    query allMessages($groupID: String!, $first: Int, $after: Int) {
        user {
            id
            username
        }
        group(id: $groupID) {
            id
            name
            unreadCount
            lastViewedMessage
            messages(sort: true, first: $first, after: $after) {
                id
                message
                timestamp
                from {
                    id
                    username
                    profilePic
                }
            }
            role {
                name
            }
        }
    }
`;

export const SEND_MESSAGE = gql`
    mutation sendMessage($groupId: String!, $msg: String!) {
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

export const MESSAGE_SUBSCRIPTION = gql`
    subscription messages($groupId: String!) {
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

export const ADD_ERROR = gql`
    mutation addErrorMessage(
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

export const TOGGLE_VIEW_STATE = gql`
    mutation toggleViewStatus($groupId: String!, $viewing: Boolean!) {
        viewingStatus(groupId: $groupId, viewing: $viewing)
    }
`;
