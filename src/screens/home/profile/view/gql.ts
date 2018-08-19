import gql from 'graphql-tag';

export default gql`
    {
        user {
            fullname
            about
        }
    }
`;
