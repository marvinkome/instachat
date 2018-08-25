import gql from 'graphql-tag';

export default gql`
    {
        user {
            id
            fullname
            about
        }
    }
`;
