import gql from 'graphql-tag';
import { withClientState } from 'apollo-link-state';
import { createOptimisticResp } from '../helpers';

const resolvers = {
    Mutation: {
        addErrorMessage(_: any, variables: any, ctx: any) {
            const id = ctx.getCacheKey({
                __typename: 'Group',
                id: variables.groupId
            });

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

            const msg = createOptimisticResp(
                variables.msg,
                variables.user,
                false
            );

            const group = ctx.cache.readFragment({ fragment, id });
            group.messages.unshift({
                ...msg.sendMessage
            });

            console.log('fragment', group);
            const data = { group };

            console.log('writing local cache');
            ctx.cache.writeData({ data });
            console.log('after write');

            return { data };
        }
    }
};

export default (cache: any) =>
    withClientState({
        resolvers,
        cache
    });
