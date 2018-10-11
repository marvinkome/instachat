import * as React from 'react';
import { Query } from 'react-apollo';
import { NavigationTabScreenOptions } from 'react-navigation';

import { showAlert, hideAlert } from '../../../lib/helpers';
import View from './view';
import query from './gql';

/**
 * Init chat page
 */
export class Chats extends React.Component {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarLabel: 'Chats'
    };

    render() {
        const variables = {
            lastMessageTimestamp: '0'
        };
        return (
            <Query
                query={query}
                variables={variables}
                fetchPolicy="cache-and-network"
            >
                {({ error, loading, data }) => {
                    // if there's no data and there's error
                    if ((error && !data) || !data.groups) {
                        showAlert('Something is wrong', 'error');
                        return null;
                    }

                    if (data.groups) {
                        hideAlert();
                        return <View data={data} />;
                    }

                    return null;
                }}
            </Query>
        );
    }
}
