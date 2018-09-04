import * as React from 'react';
import { Text } from 'react-native';
import { Query } from 'react-apollo';
import { formatDate } from '../../../../lib/helpers';
import View from './view';
import query from './gql';

function parseData(data: any) {
    if (data) {
        const userGroups: any[] = data.user.userGroups;
        return userGroups.reduce((total: any[], curr) => {
            total.push({
                name: curr.group.name,
                text: 'Fake text',
                image: require('../../../../../static/pp.jpg'),
                timestamp: formatDate(new Date()),
                unread: 4
            });

            return total;
        }, []);
    }

    return null;
}

export default class MainView extends React.Component {
    state = {
        typing: false
    };
    render() {
        return (
            <Query query={query}>
                {({ data, loading, error }) => {
                    if (error) {
                        return <Text>{error.message}</Text>;
                    }

                    if (!loading) {
                        const userData = parseData(data);
                        return userData ? <View lists={userData} /> : null;
                    }

                    return null;
                }}
            </Query>
        );
    }
}
