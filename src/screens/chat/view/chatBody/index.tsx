import * as React from 'react';
// import { ToastAndroid } from 'react-native';
// import { Query } from 'react-apollo';
import View from './view';
// import query from './gql';

interface Props {
    items: Array<{
        id: string;
        from: {
            id: string;
            username: string;
        };
        message: string;
        timestamp: any;
    }>;
    subscribe: () => void;
}

export default class ChatBody extends React.Component<Props> {
    componentDidMount() {
        this.props.subscribe();
    }
    render() {
        return (
            <View loggedUser={'johndoe'} {...this.props} />
            // <Query query={query}>
            //     {({ data, error }) => {
            //         if (error || !data.user || !data.user.username) {
            //             ToastAndroid.show(
            //                 'Error recieving messages',
            //                 ToastAndroid.SHORT
            //             );
            //             return null;
            //         }

            //         return (
            //             <View loggedUser={data.user.username} {...this.props} />
            //         );
            //     }}
            // </Query>
        );
    }
}
