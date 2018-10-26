import * as React from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';

import { showAlert, hideAlert } from '../../../../../lib/helpers';
import { UserData } from './user-data';
import { UserSettings } from './user-settings';
import { ViewStyles as styles } from './styles';
import query from './gql';

function ViewComp({ showUser, data }: { showUser: boolean; data: any }) {
    return (
        <View style={styles.container}>
            {data.user && <UserData data={data.user} />}
            <UserSettings />
        </View>
    );
}

export default class PageView extends React.Component {
    render() {
        return (
            <Query query={query}>
                {({ error, loading, data, client }) => {
                    // if there's no data and there's error
                    if (error && !data) {
                        showAlert('Something went wrong', 'error');
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
