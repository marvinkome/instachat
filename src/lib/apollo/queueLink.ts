import { ApolloLink, Observable, Operation } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { AsyncStorageStatic } from 'react-native';
import { SyncOfflineMutation } from './syncMutation';

export class QueueMutationLink extends ApolloLink {
    storage: AsyncStorageStatic;
    storeKey = '@offlineQueueKey';
    queue: any[] = [];
    isOpen = true;

    constructor(storage: AsyncStorageStatic) {
        super();

        this.storage = storage;
    }

    /**
     * start resyncing cache mutations
     * forward all query to other links
     */
    public open = async (apolloClient: ApolloClient<any>) => {
        if (!apolloClient) {
            return;
        }

        this.isOpen = true;

        await this.resync(apolloClient);
    };

    /**
     * start queuing operations
     */
    public close = () => {
        console.warn('closing');
        this.isOpen = false;
    };

    public request(operation: Operation, forward: any) {
        // if it's open the forward
        if (this.isOpen) {
            return forward(operation);
        } else {
            // if it is close enqueue first before forwarding
            this.enqueue(operation);

            // return {offline: true}
            // return forward(operation)
            return new Observable(() => {
                return () => ({ isOffline: true });
            });
        }
    }

    /**
     * resets the queue
     */
    private clearQueue = () => {
        this.queue = [];
    };

    /**
     * Resync offline queries and clear current queue
     */
    private resync = async (apolloClient: ApolloClient<any>) => {
        const syncOfflineMutation = new SyncOfflineMutation(
            apolloClient,
            this.storage
        );
        await syncOfflineMutation.init();
        await syncOfflineMutation.sync();
        this.clearQueue();
    };

    /**
     * Stores all mutations in storage
     */
    private enqueue = async (operation: Operation) => {
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

            // update the value of local storage
            await this.storage.setItem(
                this.storeKey,
                JSON.stringify(this.queue)
            );
        }
    };
}
