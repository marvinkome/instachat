import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import { AsyncStorageStatic } from 'react-native';

export class SyncOfflineMutation {
    storeKey = 'messageQueueKey';
    offlineData: any[] = [];
    storage: AsyncStorageStatic;

    constructor(storage: AsyncStorageStatic) {
        this.storage = storage;
    }

    /**
     * Sync all mutations
     */
    public async sync(apolloClient: ApolloClient<any>) {
        // first get all messages
        await this.getOfflineMessages();

        // if there is no offline data then just exit
        if (!this.hasOfflineMessages()) {
            return;
        }

        // return as promise, but in the end clear the storage
        const uncommittedOfflineMutation: any[] = [];
        await Promise.all(
            this.offlineData.map(async (item) => {
                try {
                    const res = await apolloClient.mutate(item);
                    this.replaceErrorMessage({
                        groupId: item.variables.groupId,
                        errorId: item.variables.errorId,
                        response: res.data,
                        apolloClient
                    });
                } catch (e) {
                    // set the errored mutation to the stash
                    uncommittedOfflineMutation.push(item);
                }
            })
        );

        // wait before it was cleared
        await this.clearOfflineMessages();

        // then add again the uncommited storage
        this.addOfflineMessage(uncommittedOfflineMutation);
    }

    private replaceErrorMessage(args: {
        groupId: any;
        errorId: any;
        response: any;
        apolloClient: ApolloClient<any>;
    }) {
        const { apolloClient, errorId, groupId, response } = args;

        const fragment = gql`
            fragment group on Group {
                messages {
                    id
                    message
                    timestamp
                    from {
                        id
                        username
                    }
                }
            }
        `;

        const group: any = apolloClient.readFragment({
            fragment,
            id: `Group:${groupId}`
        });

        // remove message from cache
        group.messages = group.messages.filter(
            (msg: any) => String(msg.id) !== String(errorId)
        );

        // add new data
        group.messages.unshift(response.sendMessage);

        // add new message to cache
        apolloClient.writeFragment({
            fragment,
            data: group,
            id: `Group:${groupId}`
        });
        const newgroup: any = apolloClient.readFragment({
            fragment,
            id: `Group:${groupId}`
        });
    }

    private hasOfflineMessages() {
        return !!(this.offlineData && this.offlineData.length > 0);
    }

    private async getOfflineMessages() {
        const resp = await this.storage.getItem(this.storeKey);
        this.offlineData = JSON.parse(resp);
    }

    private async clearOfflineMessages() {
        this.offlineData = [];
        return await this.storage.removeItem(this.storeKey);
    }

    private async addOfflineMessage(queue: any[] = []) {
        // add only if there is a value
        if (queue && queue.length > 0) {
            await this.storage.setItem(this.storeKey, JSON.stringify(queue));
        }
    }
}
