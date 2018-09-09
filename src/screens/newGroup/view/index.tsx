import * as React from 'react';
import { View } from 'react-native';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

import query from '../../home/chats/view/gql';
import InviteLink from '../../../components/inviteLink';
import { createGroup } from './gql';
import { viewStyle as styles } from './styles';
import { GroupForm } from './form';

class PageView extends React.Component<NavigationInjectedProps> {
    onCompleted = (data: any) => {
        const groupId = data.createGroup.id;
        if (groupId) {
            // this.props.navigation.navigate('Chat', { groupId });
        }
    };
    renderView = (fn: MutationFn, result: MutationResult) => {
        const { data, loading } = result;
        const groupId = data && data.createGroup.id;

        return (
            <View style={styles.container}>
                <GroupForm createGroup={(variables) => fn({ variables })} />
                {!loading && groupId && <InviteLink groupId={groupId} />}
            </View>
        );
    };

    render() {
        return (
            <Mutation
                mutation={createGroup}
                onCompleted={this.onCompleted}
                refetchQueries={[{ query }]}
                awaitRefetchQueries
            >
                {(createGroupFn, result) =>
                    this.renderView(createGroupFn, result)
                }
            </Mutation>
        );
    }
}

export default withNavigation(PageView);
