import * as React from 'react';
import { MutationFn } from 'react-apollo';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

import { View } from 'react-native';
import InviteLink from '../../../components/inviteLink';
import { GroupForm } from './form';

import { viewStyle as styles } from './styles';

interface IProps {
    createGroup: MutationFn;
    data: any;
}
class PageView extends React.Component<NavigationInjectedProps & IProps> {
    render() {
        let groupId = null;

        if (this.props.data && this.props.data.createGroup) {
            const { group } = this.props.data.createGroup;
            groupId = group.id;
        }

        return (
            <View style={styles.container}>
                <GroupForm
                    createGroup={(variables) =>
                        this.props.createGroup({ variables })
                    }
                />

                {/* if data is ready */}
                {groupId && <InviteLink groupId={groupId} enableGroupLink />}
            </View>
        );
    }
}

export default withNavigation(PageView);
