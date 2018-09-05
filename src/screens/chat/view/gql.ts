import gql from 'graphql-tag';

export const sendMsg = gql`
    mutation SendMessage($groupId: String!, $msg: String!) {
        sendMessage(groupId: $groupId, message: $msg) {
            id
            message
        }
    }
`;

export default gql`
    query GroupMessages($id: String!) {
        group(id: $id) {
            id
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
    }
`;
