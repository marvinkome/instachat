import { WithApolloClient, DataValue, MutationFunc } from 'react-apollo';
import { NavigationScreenProps } from 'react-navigation';

export type messageParam = {
    groupId: string;
    msg: string;
    username: string;
    userId: string;
};

export type Props = WithApolloClient<
    NavigationScreenProps & {
        allMessages: DataValue<{ user: any; group: any }, {}>;
        sendMessage: MutationFunc<{}>;
    }
>;

export interface ViewProps {
    user: { username: string; id: string; profilePic: string };
    group: any;
    sendMsg: (obj: messageParam) => void;
    subscribe?: () => void;
    fetchMore?: () => void;
    refreshing: boolean;
}
