import { SubscribeToMoreOptions as STMO, ApolloClient } from 'apollo-client';
import { MutationFn, FetchResult } from 'react-apollo';

import { createFakeResp, generateErrorId } from '../../../lib/helpers';
import { MESSAGE_SUBSCRIPTION, ADD_ERROR, GROUP_FRAGMENT } from './gql';
import { messageParam } from './types';

export function updateFetchMore(prev: any, { fetchMoreResult, variables }: any) {
    if (!fetchMoreResult) {
        return prev;
    }

    const newMsg = fetchMoreResult.group.messages;
    const prevGroup = prev.group;

    if (newMsg.length === 0) {
        return prev;
    }

    const msgList = [...prevGroup.messages, ...newMsg];

    const res = {
        ...prev,
        group: {
            ...prev.group,
            messages: msgList
        }
    };

    return res;
}

const updateQuery = (prev: any, { subscriptionData }: any) => {
    if (!subscriptionData) {
        return prev;
    }

    const newMsg = subscriptionData.data.messageSent;

    const prevGroup = prev.group;
    const msgList = [newMsg, ...prevGroup.messages];

    return {
        ...prev,
        group: {
            ...prev.group,
            messages: msgList
        }
    };
};

/**
 * Subscription for more messages
 * @param groupId
 * @param subscibeFn
 * @returns void
 */
export function subscribeToMessages(
    groupId: string,
    subscribeFn: (options: STMO<any, any>) => void
) {
    subscribeFn({
        document: MESSAGE_SUBSCRIPTION,
        variables: { groupId },
        updateQuery: (prev, result) => updateQuery(prev, result)
    });
}

/**
 * Sends message with optimistic response
 * @param mutationFn
 * @param messageArgs
 * @param client
 * @returns optimistic response
 */
export async function sendMessage(
    mutationFn: MutationFn,
    messageArgs: messageParam,
    client: ApolloClient<any>
) {
    const id = generateErrorId({
        optimistic: true
    });

    const errorId = generateErrorId();

    // create optimistic resp
    const optimisticResp = createFakeResp({
        id,
        message: messageArgs.msg,
        userId: messageArgs.userId,
        username: messageArgs.username
    });

    // call function
    try {
        await mutationFn({
            variables: {
                groupId: messageArgs.groupId,
                msg: messageArgs.msg,
                errorId
            },
            optimisticResponse: optimisticResp
        });
    } catch (e) {
        const variables = {
            errorId,
            groupId: messageArgs.groupId,
            msg: optimisticResp.sendMessage.message,
            user: optimisticResp.sendMessage.from.username,
            userId: optimisticResp.sendMessage.from.id
        };

        onError(client, variables);
    }
}

/**
 * Update function called after successful mutation to update cache
 * @param cache
 * @param fetchResult
 * @param id
 */
export function update(cache: any, { data }: FetchResult, id: string) {
    const group = cache.readFragment({ fragment: GROUP_FRAGMENT, id: `Group:${id}` });
    if (!data || !group) {
        return;
    }

    group.messages.unshift(data.sendMessage);

    cache.writeFragment({
        fragment: GROUP_FRAGMENT,
        data: { ...group, lastMessage: data.sendMessage },
        id: `Group:${id}`
    });
}

/**
 * Called when mutation recieves an error
 * @param client
 * @param variables
 */
export function onError(client: ApolloClient<any>, variables: any) {
    client.mutate({
        mutation: ADD_ERROR,
        variables
    });
}
