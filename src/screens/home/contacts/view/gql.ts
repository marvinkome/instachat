import gql from 'graphql-tag';

export default gql`
    {
        user {
            id
            groups {
                edges {
                    node {
                        id
                        uuid
                        name
                        topic
                    }
                }
            }
        }
    }
`;
