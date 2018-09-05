import * as React from 'react';
import { Text } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Query } from 'react-apollo';
import { formatDate } from '../../../../lib/helpers';
import View from './view';
import query from './gql';

function parseData(data: any, navigate: (args: any) => void) {
    if (data) {
        const userGroups: any[] = data.user.userGroups;
        return userGroups.reduce((total: any[], curr) => {
            const name = curr.group.name;
            const text = curr.group.messages[0].message;
            const timestamp = Number(curr.group.messages[0].timestamp);

            total.push({
                name,
                text,
                unread: 4,
                image: require('../../../../../static/pp.jpg'),
                timestamp: formatDate(timestamp),
                onPress: () => navigate('Chat')
            });

            return total;
        }, []);
    }

    return null;
}

class MainView extends React.Component<
    NavigationInjectedProps,
    { typing: boolean }
> {
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
                        const userData = parseData(
                            data,
                            this.props.navigation.navigate
                        );
                        return userData ? <View lists={userData} /> : null;
                    }

                    return null;
                }}
            </Query>
        );
    }
}

export default withNavigation(MainView);
