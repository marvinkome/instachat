import gql from 'graphql-tag';

export const joinGroup = gql`
    mutation joinGroup($invite: String!) {
        joinGroup(inviteId: $invite) {
            group {
                id
                name
                messages(first: 1, sort: true) {
                    id
                    message
                    timestamp
                }
            }
            role {
                name
            }
        }
    }
`;
