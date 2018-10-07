import * as React from 'react';
import { Subscription, SubscriptionResult } from 'react-apollo';

// UI Element
import { ChatBody } from './body';

// graphql documents
import { userTypingEvent } from './gql';

export interface Props {
    items: Array<{
        id: string;
        from: {
            id: string;
            username: string;
        };
        message: string;
        timestamp: any;
    }>;
    groupId: string;
    subscribe: () => void;
}

export default class MainChatBody extends React.Component<Props> {
    componentDidMount() {
        // subscribe to more messages
        this.props.subscribe();
    }

    render() {
        const subscriptionProps = {
            subscription: userTypingEvent,
            variables: { groupId: this.props.groupId },
            fetchPolicy: 'network-only'
        };

        return (
            <Subscription {...subscriptionProps}>
                {({ data }) => {
                    return <ChatBody typingData={data} {...this.props} />;
                }}
            </Subscription>
        );
    }
}
