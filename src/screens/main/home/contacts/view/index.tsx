import * as React from 'react';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import { List } from 'react-native-elements';

import Listing from './listing';
import { ViewStyles as styles } from './styles';
import query from './gql';

class ScreenView extends React.Component<NavigationInjectedProps> {
    parseGroupsObject = (groups: any[]) => {
        const parsedGroups = groups.reduce((total: any[], item) => {
            total.push({
                ...item.node,
                name: item.node.name,
                about: item.node.topic,
                image: require('../../../../../../static/yuna.jpg'),
                onPress: () => this.props.navigation.navigate('Chat')
            });

            return total;
        }, []);

        return parsedGroups;
    };
    renderLists = (groups: any[]) => {
        const lists = this.parseGroupsObject(groups);
        return (
            <View style={styles.container}>
                <List data-testId="list" containerStyle={styles.listContainer}>
                    {lists.map((item: any) => (
                        <Listing key={item.id} listItem={item} />
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

export default withNavigation(ScreenView);
