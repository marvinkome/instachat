import { ApolloClient } from 'apollo-client';
import { AsyncStorageStatic } from 'react-native';

export class SyncOfflineMutation {
    storeKey = '@offlineQueueKey';
    offlineData = [];
    apolloClient: ApolloClient<any>;
    storage: AsyncStorageStatic;

    constructor(apolloClient: ApolloClient<any>, storage: AsyncStorageStatic) {
        this.apolloClient = apolloClient;
        this.storage = storage;
    }

    getOfflineData = async () => {
        const resp = await this.storage.getItem(this.storeKey);
        return JSON.parse(resp);
    };

    hasOfflineData = () => {
        return !!(this.offlineData && this.offlineData.length > 0);
    };

    addOfflineData = async (queue: any[] = []) => {
        // add only if there is a value
        if (queue && queue.length > 0) {
            await this.storage.setItem(this.storeKey, JSON.stringify(queue));
        }
    };

    clearOfflineData = async () => {
        this.offlineData = [];
        return await this.storage.removeItem(this.storeKey);
    };

    /**
     * Gets all offline data from storage
     */
    init = async () => {
        this.offlineData = await this.getOfflineData();
    };

    /**
     * Sync all mutations
     */
    sync = async () => {
        // if there is no offline data then just exit
        if (!this.hasOfflineData()) {
            return;
        }

        console.log('syncing mutations....');

        // return as promise, but in the end clear the storage
        const uncommittedOfflineMutation: any[] = [];

        await Promise.all(
            this.offlineData.map(async (item) => {
                try {
                    await this.apolloClient.mutate(item);
                } catch (e) {
                    // set the errored mutation to the stash
                    uncommittedOfflineMutation.push(item);
                }
            })
        );

        // wait before it was cleared
        await this.clearOfflineData();

        // then add again the uncommited storage
        this.addOfflineData(uncommittedOfflineMutation);
    };
}
