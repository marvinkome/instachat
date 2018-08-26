import * as React from 'react';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';

import { UserData } from './user-data';
import { UserSettings } from './user-settings';
import { ViewStyles as styles } from './styles';
import query from './gql';

export default class PageView extends React.Component {
    viewFunc = (data: any) => {
        return (
            <View style={styles.container}>
                <UserData data={data.user} />
                <UserSettings />
            </View>
        );
    };
    render() {
        return (
            <Query query={query}>
                {({ data, loading, error }) => {
                    if (error) {
                        return <Text>{JSON.stringify(error)} </Text>;
                    }
                    if (!loading) {
                        return this.viewFunc(data);
                    }

                    return <Text>Loading...</Text>;
                }}
            </Query>
        );
    }
}
