import * as React from 'react';
import { Query } from 'react-apollo';
import { NavigationTabScreenOptions } from 'react-navigation';

import { showAlert, hideAlert, networkErrHandler } from '../../../lib/helpers';
import View from './view';
import query from './gql';

export class Chats extends React.Component {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarLabel: 'Chats'
    };

    render() {
        return (
            <Query query={query}>
                {({ error, loading, data, client }) => {
                    if (error) {
                        // check if it's a network error
                        if (error.message.match(/network/i)) {
                            return networkErrHandler(client, query, View);
                        }

                        showAlert(error.message, 'error');
                        return null;
                    }

                    if (loading) {
                        showAlert('loading groups', 'success');
                        return null;
                    }

                    hideAlert();
                    return data.user ? <View data={data} /> : null;
                }}
            </Query>
        );
    }
}
