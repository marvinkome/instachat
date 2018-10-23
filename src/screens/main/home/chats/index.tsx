import * as React from 'react';
import { graphql, DataProps, Subscription } from 'react-apollo';
import {
    NavigationTabScreenOptions,
    NavigationScreenProps,
    NavigationEventSubscription
} from 'react-navigation';

import { showAlert, hideAlert } from '../../../lib/helpers';
import View from './view';
import query, { TYPING_SUBSCRIPTION } from './gql';

type Props = NavigationScreenProps & DataProps<{ groups: any }, {}>;

class Chats extends React.Component<Props> {
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
        if (error && !groups) {
            showAlert('Something is wrong', 'error');
            return null;
        }

        if (groups) {
            hideAlert();
            return (
                <Subscription subscription={TYPING_SUBSCRIPTION}>
                    {({ data }) => <View typingData={data} data={{ groups }} />}
                </Subscription>
            );
        }

        return null;
    }
}

const enhancer = graphql(query, {
    options: { fetchPolicy: 'cache-and-network', errorPolicy: 'all' }
});
export default enhancer(Chats);
