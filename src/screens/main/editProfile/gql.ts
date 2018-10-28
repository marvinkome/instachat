import gql from 'graphql-tag';

export const USER_INFO = gql`
    {
        user {
            id
            username
            about
            email
            profilePic
        }
    }
`;

export const UPDATE_INFO = gql`
    mutation updateUser($username: String, $about: String, $email: String, $imageUrl: String) {
        updateUser(username: $username, email: $email, about: $about, pic: $imageUrl) {
            id
            username
            about
            email
            profilePic
        }
    }
`;
