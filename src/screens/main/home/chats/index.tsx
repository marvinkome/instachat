import * as React from 'react';
import { ActivityIndicator, View as RNView } from 'react-native';
import { graphql, DataProps, Subscription } from 'react-apollo';
import * as Navigation from 'react-navigation';

import theme from '../../../../lib/colors';
import { showAlert, hideAlert } from '../../../../lib/helpers';
import View from './view';
import query, { TYPING_SUBSCRIPTION } from './gql';

type Props = Navigation.NavigationScreenProps & DataProps<{ groups: any }, {}>;

class Chats extends React.Component<Props> {
    static navigationOptions: Navigation.NavigationTabScreenOptions = {
        tabBarLabel: 'Chats'
    };

    pageFocusListener: Navigation.NavigationEventSubscription;

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

        return (
            <RNView style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.primary.regular }}>
                <ActivityIndicator size="large" color={theme.secondary.regular} />
            </RNView>
        );
    }
}

const enhancer = graphql(query, {
    options: { fetchPolicy: 'cache-and-network', errorPolicy: 'all' }
});
export default enhancer(Chats);
