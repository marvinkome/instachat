import * as React from 'react';
import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption
} from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';
import InviteLink from '../../../../components/inviteLink';
import { chatHeaderStyles as styles } from '../styles';

interface IProps {
    role: string;
    groupId: string;
}

// TODO: Style menu
// TODO: refactor this component
export class RightIcon extends React.Component<IProps> {
    state = {
        showInvite: false
    };
    options = () => {
        return (
            <MenuOptions>
                {this.props.role === 'administrator' && (
                    <MenuOption
                        text="Create Invite Link"
                        onSelect={() => this.setState({ showInvite: true })}
                    />
                )}
                <MenuOption text="Fake Item" />
            </MenuOptions>
        );
    };
    render() {
        return (
            <React.Fragment>
                <Menu>
                    <MenuTrigger>
                        <Icon
                            name="dots-three-vertical"
                            type="entypo"
                            iconStyle={styles.rightIcon}
                        />
                    </MenuTrigger>
                    {this.options()}
                </Menu>
                {this.state.showInvite && (
                    <InviteLink groupId={this.props.groupId} />
                )}
            </React.Fragment>
        );
    }
}
