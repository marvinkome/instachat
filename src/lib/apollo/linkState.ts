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
                variables.userId,
                variables.user,
                false
            );

            const group = ctx.cache.readFragment({ fragment, id });
            group.messages.unshift({
                ...msg.sendMessage
            });

            const data = { group };
            ctx.cache.writeData({ data });

            return group;
        }
    }
};

export default (cache: any) =>
    withClientState({
        resolvers,
        cache
    });
