import gql from 'graphql-tag';
import { withClientState } from 'apollo-link-state';
import { createFakeResp } from '../helpers';

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

            console.log('error vars', variables);
            const msg = createFakeResp({
                id: variables.errorId,
                message: variables.msg,
                userId: variables.userId,
                username: variables.user
            });

            const group = ctx.cache.readFragment({ fragment, id });
            group.messages.unshift({
                ...msg.sendMessage
            });

            const data = { group };
            // ctx.cache.writeData({ data });

            return group;
        }
    }
};

export default (cache: any) =>
    withClientState({
        resolvers,
        cache
    });
