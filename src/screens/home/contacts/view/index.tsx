import * as React from 'react';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import { List } from 'react-native-elements';

import Listing from './listing';
import { ViewStyles as styles } from './styles';
import query from './gql';

export default class ScreenView extends React.Component {
    parseGroupsObject = (groups: any[]) => {
        const parsedGroups = groups.reduce((total: any[], item) => {
            total.push({
                name: item.node.name,
                about: item.node.topic,
                image: require('../../../../../static/yuna.jpg')
            });

            return total;
        }, []);

        return parsedGroups;
    };
    renderLists = (groups: any[]) => {
        const lists = this.parseGroupsObject(groups);
        return (
            <View style={styles.container}>
                <List containerStyle={styles.listContainer}>
                    {lists.map((item: any, index: number) => (
                        <Listing key={index} listItem={item} />
                    ))}
                </List>
            </View>
        );
    };
    render() {
        return (
            <Query query={query}>
                {({ data, error, loading }) => {
                    if (error) {
                        return <Text>{JSON.stringify(error)} </Text>;
                    }
                    if (!loading) {
                        const groups = data.user.groups.edges;
                        return this.renderLists(groups);
                    }

                    return <Text>Loading...</Text>;
                }}
            </Query>
        );
    }
}
