import gql from 'graphql-tag';

export default gql`
    {
        user {
            id
            groups {
                edges {
                    node {
                        name
                        topic
                    }
                }
            }
        }
    }
`;
