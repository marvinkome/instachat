import * as React from 'react';
import { Text } from 'react-native';
import {
    withNavigation,
    NavigationInjectedProps as NIP
} from 'react-navigation';
import { Query } from 'react-apollo';
import { formatDate } from '../../../../lib/helpers';
import View from './view';
import query from './gql';

function reduceFunc(total: any[], curr: any, navigate: any) {
    // check if group is null
    if (!curr.group) {
        return total;
    }

    const groupId = curr.group.id;
    const name = curr.group.name;
    let text = 'curr.group.messages.message';
    let timestamp = 0;

    // check if it has a last message
    if (curr.group.messages.length) {
        text = curr.group.messages[0].message;
        timestamp = Number(curr.group.messages[0].timestamp);
    }

    total.push({
        name,
        text,
        unread: 4,
        image: require('../../../../../static/pp.jpg'),
        timestamp: formatDate(timestamp),
        onPress: () => navigate('Chat', { groupId })
    });

    return total;
}

function parseData(data: any, navigate: (args: any, params?: any) => void) {
    if (data) {
        const userGroups: any[] = data.user.userGroups;
        return userGroups.reduce(
            (total: any[], curr: any) => reduceFunc(total, curr, navigate),
            []
        );
    }

    return null;
}

class MainView extends React.Component<NIP, { typing: boolean }> {
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
