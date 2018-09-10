import gql from 'graphql-tag';

export default gql`
    query ChatHeader($groupId: String!) {
        user {
            id
            userGroup(groupId: $groupId) {
                role {
                    name
                }
            }
        }
    }
`;
