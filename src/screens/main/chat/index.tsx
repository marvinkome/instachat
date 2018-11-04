import * as React from 'react';
import { AppState, View as RNView, ActivityIndicator } from 'react-native';

// Apollo
import * as Apollo from 'react-apollo';
import * as Gql from './gql';

// types
import * as Navigation from 'react-navigation';
import { messageParam, Props } from './types';

// helpers
import ErrorView from '../../../components/errorView';
import theme from '../../../lib/colors';
import { showAlert } from '../../../lib/helpers';
import * as utils from './utils';

// UI
import View from './view';

// context
import ChatContext from './context';

class ChatScreen extends React.Component<Props> {
    static navigationOptions = {
        header: null
    };

    state = { refreshing: false };
    // params from router
    groupId = this.props.navigation.getParam('groupId');
    pageFocusListener: Navigation.NavigationEventSubscription;
    pageBlurListener: Navigation.NavigationEventSubscription;

    componentDidMount() {
        AppState.addEventListener('change', this.handleViewChange);
        this.pageFocusListener = this.props.navigation.addListener('didFocus', () =>
            this.handleViewChange('active')
        );

        this.pageBlurListener = this.props.navigation.addListener('willBlur', () =>
            this.handleViewChange('inactive')
        );
    }

    setViewState = async (viewing: boolean) => {
        try {
            await this.props.client.mutate({
                mutation: Gql.TOGGLE_VIEW_STATE,
                variables: {
                    groupId: this.groupId,
                    viewing
                }
            });
        } catch (e) {
            return;
        }
    };

    handleViewChange = (view: any) => {
        if (view === 'active') {
            this.setViewState(true);
        } else {
            this.setViewState(false);
        }
    };

    fetchMore = () => {
        if (this.state.refreshing) {
            return;
        }

        this.setState({ refreshing: true }, async () => {
            const messageCount = this.props.allMessages.group.messages.length;
            await this.props.allMessages.fetchMore({
                variables: { after: messageCount },
                updateQuery: utils.updateFetchMore
            });
            this.setState({ refreshing: false });
        });
    };

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleViewChange);
        this.pageFocusListener.remove();
        this.pageBlurListener.remove();
    }

    sendMessage = (fn: Apollo.MutationFn, args: messageParam) => {
        utils.sendMessage(fn, args, this.props.client);
    };

    render() {
        const queryData = this.props.allMessages;
        const mutate = this.props.sendMessage;

        if (queryData.error && (!queryData.user || !queryData.group)) {
            showAlert('Something went wrong', 'error');
            return <ErrorView message="Something went wrong" />;
        }

        if (queryData.user && queryData.group) {
            const props = {
                user: queryData.user,
                group: queryData.group,
                subscribe: () => utils.subscribeToMessages(this.groupId, queryData.subscribeToMore),
                sendMsg: (obj: messageParam) => this.sendMessage(mutate, obj),
                fetchMore: this.fetchMore,
                refreshing: this.state.refreshing
            };

            return (
                <ChatContext.Provider value={props}>
                    <View />
                </ChatContext.Provider>
            );
        }

        return (
            <RNView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: theme.primary.regular
                }}
            >
                <ActivityIndicator size="large" color={theme.secondary.regular} />
            </RNView>
        );
    }
}

const queryEnhancer = Apollo.graphql(Gql.ALL_MESSAGES, {
    name: 'allMessages',
    options: (props: Navigation.NavigationScreenProps) => ({
        variables: { groupID: props.navigation.getParam('groupId'), first: 15 },
        fetchPolicy: 'cache-and-network'
    })
});
const mutationEnhancer = Apollo.graphql(Gql.SEND_MESSAGE, {
    name: 'sendMessage',
    options: (props: Navigation.NavigationScreenProps) => ({
        update: (cache: any, res: any) =>
            utils.update(cache, res, props.navigation.getParam('groupId'))
    })
});
const enhancer = Apollo.compose(
    Apollo.withApollo,
    queryEnhancer,
    mutationEnhancer
);

export default enhancer(ChatScreen);
