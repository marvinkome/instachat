import * as React from 'react';
import { graphql, DataProps } from 'react-apollo';
import {
    NavigationTabScreenOptions,
    NavigationScreenProps,
    NavigationEventSubscription
} from 'react-navigation';

import { showAlert, hideAlert } from '../../../lib/helpers';
import View from './view';
import query from './gql';

/**
 * Init chat page
 */
class Chats extends React.Component<NavigationScreenProps & DataProps<{ groups: any }, {}>> {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarLabel: 'Chats'
    };

    pageFocusListener: NavigationEventSubscription;

    componentDidMount() {
        this.pageFocusListener = this.props.navigation.addListener('willFocus', () =>
            this.props.data.refetch()
        );
    }

    componentWillUnmount() {
        this.pageFocusListener.remove();
    }

    render() {
        const { error, groups } = this.props.data;

        // if there's no data and there's error
        if (error || !groups) {
            showAlert('Something is wrong', 'error');
            return null;
        }

        if (groups) {
            hideAlert();
            return <View data={{ groups }} />;
        }

        return null;
    }
}

const enhancer = graphql(query, { options: { fetchPolicy: 'cache-and-network' } });
export default enhancer(Chats);
