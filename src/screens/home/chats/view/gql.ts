import gql from 'graphql-tag';

export default gql`
    {
        user {
            id
            userGroups {
                group {
                    id
                    name
                    messages {
                        id
                        message
                        timestamp
                    }
                }
            }
        }
    }
`;
