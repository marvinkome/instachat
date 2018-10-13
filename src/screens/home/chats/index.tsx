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

    componentDidMount() {
        console.warn('groups loaded');
    }
    render() {
        return (
            <Query query={query} fetchPolicy="cache-and-network">
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
