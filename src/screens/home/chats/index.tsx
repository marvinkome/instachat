import * as React from 'react';
import { Query } from 'react-apollo';
import { NavigationTabScreenOptions } from 'react-navigation';
import View from './view';
import query from './gql';

export class Chats extends React.Component {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarLabel: 'Chats'
    };

    render() {
        // run query here view shouldn't contain any data fetching
        return (
            <Query query={query}>
                {({ error, loading, data }) => {
                    if (error) {
                        // TODO: Use arror component
                        console.warn(error);
                        return null;
                    }

                    if (loading) {
                        // TODO: Use loader component
                        return null;
                    }

                    return data.user ? <View data={data} /> : null;
                }}
            </Query>
        );
    }
}
