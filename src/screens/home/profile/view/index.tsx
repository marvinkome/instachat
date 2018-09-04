import * as React from 'react';
import { View, Text } from 'react-native';
import { Query, QueryResult } from 'react-apollo';

import { UserData } from './user-data';
import { UserSettings } from './user-settings';
import { ViewStyles as styles } from './styles';
import query from './gql';

export default class PageView extends React.Component {
    viewFunc = ({ data, error, loading }: QueryResult) => {
        return (
            <View style={styles.container}>
                {error && <Text>{error.message}</Text>}
                {!loading && !error && <UserData data={data.user} />}
                <UserSettings />
            </View>
        );
    };
    render() {
        return <Query query={query}>{(resp) => this.viewFunc(resp)}</Query>;
    }
}
