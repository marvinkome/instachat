import gql from 'graphql-tag';

export default gql`
    {
        user {
            id
            userGroups {
                group {
                    id
                    name
                    messages(first: 1, sort: true) {
                        id
                        message
                        timestamp
                    }
                }
            }
        }
    }
`;
