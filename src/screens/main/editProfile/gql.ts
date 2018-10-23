import gql from 'graphql-tag';

export const USER_INFO = gql`
    {
        user {
            id
            username
            about
            email
        }
    }
`;

export const UPDATE_INFO = gql`
    mutation updateUser($username: String, $about: String, $email: String) {
        updateUser(username: $username, email: $email, about: $about) {
            id
            username
            about
            email
        }
    }
`;
