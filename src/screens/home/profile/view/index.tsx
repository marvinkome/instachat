import * as React from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';

import {
    networkErrHandler,
    showAlert,
    hideAlert
} from '../../../../lib/helpers';
import { UserData } from './user-data';
import { UserSettings } from './user-settings';
import { ViewStyles as styles } from './styles';
import query from './gql';

function ViewComp({ showUser, data }: { showUser: boolean; data: any }) {
    return (
        <View style={styles.container}>
            {data && <UserData data={data.user} />}
            <UserSettings />
        </View>
    );
}

export default class PageView extends React.Component {
    render() {
        return (
            <Query query={query}>
                {({ error, loading, data, client }) => {
                    if (error) {
                        // check if it's a network error
                        if (error.message.match(/network/i)) {
                            return networkErrHandler(client, query, (cache) => (
                                <ViewComp showUser={true} data={cache} />
                            ));
                        }

                        showAlert(error.message, 'error');
                        return <ViewComp showUser={true} data={null} />;
                    }

                    if (loading) {
                        return null;
                    }

                    hideAlert();
                    return <ViewComp showUser={true} data={data} />;
                }}
            </Query>
        );
    }
}
