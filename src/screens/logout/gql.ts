import gql from 'graphql-tag';

export const GROUP_ID = gql`
    query groupID {
        groups {
            id
        }
    }
`;
