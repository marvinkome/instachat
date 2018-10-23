import gql from 'graphql-tag';

export const REGISTER_DEVICE_TOKEN = gql`
    mutation registerDevice($token: String!) {
        registerDevice(token: $token) {
            id
        }
    }
`;
