import { SubscribeToMoreOptions as STMO, ApolloClient } from 'apollo-client';
import { MutationFn, FetchResult } from 'react-apollo';

import { createFakeResp, generateErrorId } from '../../lib/helpers';
import query, { querySubscription, addError } from './gql';

const updateQuery = (prev: any, { subscriptionData }: any) => {
    if (!subscriptionData) {
        return prev;
    }

    const newMsg = subscriptionData.data.messageSent;

    // if it's same user dont
    if (prev.user.username === newMsg.from.username) {
        return prev;
    }

    const prevGroup = prev.user.userGroup.group;
    const msgList = [newMsg, ...prevGroup.messages];

    return {
        ...prev,
        user: {
            ...prev.user,
            userGroup: {
                ...prev.user.userGroup,
                group: {
                    ...prev.user.userGroup.group,
                    messages: msgList
                }
            }
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
        document: querySubscription,
        variables: { groupId },
        updateQuery: (prev, result) => updateQuery(prev, result)
    });
}

export interface SendMessageArgs {
    groupId: string;
    msg: string;
    username: string;
    userId: string;
}

/**
 * Sends message with optimistic response
 * @param mutationFn
 * @param messageArgs
 * @returns optimistic response
 */
export function sendMessage(
    mutationFn: MutationFn,
    messageArgs: SendMessageArgs
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
    mutationFn({
        variables: {
            groupId: messageArgs.groupId,
            msg: messageArgs.msg,
            errorId
        },
        optimisticResponse: optimisticResp
    });

    return { optimisticResp, errorId };
}

/**
 * Update function called after successfull mutation to update cache
 * @param cache
 * @param fetchResult
 * @param id
 */
export function update(cache: any, { data }: FetchResult, id: string) {
    const prev = cache.readQuery({ query, variables: { id } });
    if (!data || !prev) {
        return;
    }

    // @ts-ignore
    const { user } = prev;
    user.group.messages.unshift(data.sendMessage);

    cache.writeQuery({ query, data: { user } });
}

function updateMutation(cache: any, { data }: any, id: string) {
    const prev = cache.readQuery({
        query,
        variables: { id }
    });

    if (!data || !prev) {
        return;
    }

    // @ts-ignore
    const { user } = prev;
    user.group = {
        ...user.group,
        messages: data.addErrorMessage.messages
    };

    cache.writeQuery({ query, data: { user } });
    // cache.readQuery({ query, variables: { id: this.id } });
}

/**
 * Called when mutation recieves an error
 * @param client
 * @param variables
 */
export function onError(client: ApolloClient<any>, variables: any) {
    client.mutate({
        mutation: addError,
        variables,
        update: (cache, res) => updateMutation(cache, res, variables.groupId)
    });
}
