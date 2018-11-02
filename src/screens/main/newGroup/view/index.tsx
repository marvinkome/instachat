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
    state = { imageUrl: '' };

    showPicker = async () => {
        try {
            const data = await showImagePicker('Select group icon');
            const imageUrl = await uploadImage(data.path, data.name);
            if (!imageUrl) {
                return;
            }

            this.setState({ imageUrl });
        } catch (e) {
            return;
        }
    };

    createGroup = (variables: any) => {
        this.props.createGroup({
            variables: {
                imageUrl: this.state.imageUrl,
                ...variables
            }
        });
    };

    render() {
        let groupId = null;

        if (this.props.data && this.props.data.createGroup) {
            groupId = this.props.data.createGroup.id;
        }

        const avatar = this.state.imageUrl.length
            ? { source: { uri: this.state.imageUrl } }
            : { icon: { name: 'group', type: 'material-icons' } };

        return (
            <ScrollView style={styles.container}>
                <View style={styles.avatar}>
                    <Avatar rounded={true} large={true} onPress={this.showPicker} {...avatar} />
                </View>
                <GroupForm createGroup={this.createGroup} />

                {/* if data is ready */}
                {groupId && <InviteLink groupId={groupId} enableGroupLink />}
            </ScrollView>
        );
    }
}

export default withNavigation(PageView);
