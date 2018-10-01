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
                {({ error, loading, data }) => {
                    // if there's no data and there's error
                    if (error && !data.user) {
                        showAlert('Something is wrong', 'error');
                        return null;
                    }

                    if (data.user) {
                        hideAlert();
                        return <View data={data} />;
                    }

                    return null;
                }}
            </Query>
        );
    }
}
