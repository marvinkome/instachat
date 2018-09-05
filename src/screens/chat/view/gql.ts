import gql from 'graphql-tag';

export default gql`
    query GroupMessages($id: String!) {
        group(id: $id) {
            id
            messages {
                id
                message
                timestamp
                from {
                    id
                    username
                }
            }
        }
    }
`;
