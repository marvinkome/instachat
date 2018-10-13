import * as React from 'react';
import { AppState } from 'react-native';

// Apollo
import {
    MutationFn,
    WithApolloClient,
    withApollo,
    graphql,
    compose,
    DataValue,
    MutationFunc
} from 'react-apollo';
import { ALL_MESSAGES, SEND_MESSAGE, TOGGLE_VIEW_STATE } from './gql';

// types
import { NavigationScreenProps, NavigationEventSubscription } from 'react-navigation';
import { messageParam } from './types';

// helpers
import { showAlert } from '../../lib/helpers';
import * as utils from './utils';

// UI
import View from './view';

type Props = WithApolloClient<
    NavigationScreenProps & {
        allMessages: DataValue<{ user: any; group: any }, {}>;
        sendMessage: MutationFunc<{}>;
    }
>;

class ChatScreen extends React.Component<Props> {
    static navigationOptions = {
        header: null
    };

    // params from router
    groupId = this.props.navigation.getParam('groupId');
    pageFocusListener: NavigationEventSubscription;
    pageBlurListener: NavigationEventSubscription;

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
                mutation: TOGGLE_VIEW_STATE,
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

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleViewChange);
        this.pageFocusListener.remove();
        this.pageBlurListener.remove();
    }

    sendMessage = (fn: MutationFn, args: messageParam) => {
        utils.sendMessage(fn, args, this.props.client);
    };

    render() {
        const queryData = this.props.allMessages;
        const mutate = this.props.sendMessage;

        if (queryData.error && (!queryData.user || !queryData.group)) {
            showAlert('Something is wrong', 'error');
            return null;
        }

        if (queryData.user && queryData.group) {
            const props = {
                user: queryData.user,
                group: queryData.group,
                subscribe: () => utils.subscribeToMessages(this.groupId, queryData.subscribeToMore),
                sendMsg: (obj: messageParam) => this.sendMessage(mutate, obj)
            };

            return <View {...props} />;
        }

        return null;
    }
}

const queryEnhancer = graphql(ALL_MESSAGES, {
    name: 'allMessages',
    options: (props: NavigationScreenProps) => ({
        variables: { groupID: props.navigation.getParam('groupId') },
        fetchPolicy: 'cache-and-network'
    })
});
const mutationEnhancer = graphql(SEND_MESSAGE, {
    name: 'sendMessage',
    options: (props: NavigationScreenProps) => ({
        update: (cache: any, res: any) =>
            utils.update(cache, res, props.navigation.getParam('groupId'))
    })
});
const enhancer = compose(
    withApollo,
    queryEnhancer,
    mutationEnhancer
);

export default enhancer(ChatScreen);
