import * as React from 'react';
import { MutationFn } from 'react-apollo';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

import { View, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';

import { showImagePicker, uploadImage } from '../../../../lib/helpers';
import InviteLink from '../../../../components/inviteLink';

import { GroupForm } from './form';
import { viewStyle as styles } from './styles';

interface IProps {
    createGroup: MutationFn;
    data: any;
}
class PageView extends React.Component<NavigationInjectedProps & IProps> {
    showPicker = async () => {
        const data = showImagePicker('Select group icon');
        if (!data) {
            return;
        }

        const imageUrl = await uploadImage(data.path, data.name);
        if (!imageUrl) {
            return;
        }
    };

    render() {
        let groupId = null;

        if (this.props.data && this.props.data.createGroup) {
            const { group } = this.props.data.createGroup;
            groupId = group.id;
        }

        return (
            <ScrollView style={styles.container}>
                <View style={styles.avatar}>
                    <Avatar
                        rounded={true}
                        large={true}
                        onPress={this.showPicker}
                        icon={{ name: 'group', type: 'material-icons' }}
                    />
                </View>
                <GroupForm createGroup={(variables) => this.props.createGroup({ variables })} />

                {/* if data is ready */}
                {groupId && <InviteLink groupId={groupId} enableGroupLink />}
            </ScrollView>
        );
    }
}

export default withNavigation(PageView);
