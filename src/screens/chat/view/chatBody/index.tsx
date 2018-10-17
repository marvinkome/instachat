import * as React from 'react';
import { Subscription } from 'react-apollo';

// UI Element
import ChatBody from './body';

// graphql documents
import { userTypingEvent } from './gql';

import { contextConnect } from '../../../../lib/context';
import context from '../../context';
import { ViewProps } from '../../types';

export interface Props {
    groupId: string;
    subscribe: () => void;
}

class MainChatBody extends React.Component<Props> {
    componentDidMount() {
        // subscribe to more messages
        this.props.subscribe();
    }

    render() {
        const subscriptionProps = {
            subscription: userTypingEvent,
            variables: { groupId: this.props.groupId }
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

export default contextConnect(context, (store: ViewProps) => ({
    groupId: store.group.id,
    subscribe: store.subscribe
}))(MainChatBody);
