import { Observable, Operation } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { AsyncStorageStatic } from 'react-native';
import { SyncOfflineMutation } from './syncMutation';

export class MessageQueue {
    storage: AsyncStorageStatic;
    storeKey = 'messageQueueKey';
    queue: any[] = [];
    isOpen = true;

    constructor(storage: AsyncStorageStatic) {
        this.storage = storage;
    }

    /**
     * Add new message to storage
     * @param operation
     */
    public async enqueue(operation: Operation) {
        const { query, variables } = operation;
        let definitions: any[] = [];

        if (query && query.definitions) {
            definitions = query.definitions.filter(
                // @ts-ignore
                (def) => def.operation === 'mutation'
            );
        }

        // store only if there are values for query.definitions
        if (definitions.length > 0) {
            query.definitions = definitions;
            this.queue.push({ mutation: query, variables });

            console.log(`adding ${operation.operationName} to storage`);
            // update the value of local storage
            await this.storage.setItem(
                this.storeKey,
                JSON.stringify(this.queue)
            );
        }
    }

    /**
     * Resend queued messages and clear queue
     * @param apolloClient
     */
    public async resync(apolloClient: ApolloClient<any>) {
        const syncOfflineMutation = new SyncOfflineMutation(this.storage);
        await syncOfflineMutation.sync(apolloClient);
        this.queue = [];
    }

    /**
     * resets the queue
     */
    public async clearQueue() {
        this.queue = [];
        return await this.storage.removeItem(this.storeKey);
    }
}
