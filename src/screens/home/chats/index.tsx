import * as React from 'react';
import { Query } from 'react-apollo';
import { NavigationTabScreenOptions } from 'react-navigation';

import { showAlert, hideAlert } from '../../../lib/helpers';
import View from './view';
import query from './gql';

export class Chats extends React.Component {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarLabel: 'Chats'
    };

    render() {
        return (
            <Query query={query}>
                {({ error, loading, data, refetch }) => {
                    if (error) {
                        showAlert(error.message, 'error');
                        return null;
                    }

                    if (loading) {
                        showAlert('loading groups', 'success');
                        return null;
                    }

                    hideAlert();
                    return data.user ? (
                        <View data={data} refetch={refetch} />
                    ) : null;
                }}
            </Query>
        );
    }
}
