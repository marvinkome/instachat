import * as React from 'react';

// UI elements
import { Menu, MenuTrigger, MenuOption, MenuOptions } from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';

import DeleteModal from '../../../../../components/deleteGroup';
import InviteLink from '../../../../../components/inviteLink';

// styles
import { chatHeaderStyles as styles } from '../styles';
const menuStyle = {
    optionsWrapper: styles.menuOptions,
    optionText: styles.menuText
};

interface Props {
    role: string;
    groupId: string;
}

export default class RightComponent extends React.Component<Props> {
    state = { showInvite: false, showDelete: false };
    toggleInvite = () => this.setState({ showInvite: !this.state.showInvite });
    toggleDelete = () => this.setState({ showDelete: !this.state.showDelete });

    render() {
        return this.props.role === 'administrator' ? (
            <Menu>
                <MenuTrigger>
                    <Icon name="dots-three-vertical" type="entypo" iconStyle={styles.rightIcon} />
                </MenuTrigger>
                <MenuOptions customStyles={menuStyle}>
                    <MenuOption text="Create Invite Link" onSelect={this.toggleInvite} />
                    <MenuOption text="Delete Group" onSelect={this.toggleDelete} />
                </MenuOptions>

                {this.state.showInvite && <InviteLink groupId={this.props.groupId} />}
                {this.state.showDelete && (
                    <DeleteModal
                        groupId={this.props.groupId}
                        isOpen={this.state.showDelete}
                        toggle={this.toggleDelete}
                    />
                )}
            </Menu>
        ) : null;
    }
}
