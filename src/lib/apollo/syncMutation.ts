import { ApolloClient } from 'apollo-client';
import { AsyncStorageStatic } from 'react-native';

export class SyncOfflineMutation {
    storeKey = 'messageQueueKey';
    offlineData = [];
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

        console.log(`re-syncing ${this.offlineData.length} messages`);

        // if there is no offline data then just exit
        if (!this.hasOfflineMessages()) {
            return;
        }

        // return as promise, but in the end clear the storage
        const uncommittedOfflineMutation: any[] = [];
        await Promise.all(
            this.offlineData.map(async (item) => {
                try {
                    await apolloClient.mutate(item);
                    console.log('sync successfull');
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
