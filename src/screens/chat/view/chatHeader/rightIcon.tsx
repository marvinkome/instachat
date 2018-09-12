import * as React from 'react';
import { compose, withState, ComponentEnhancer as CE } from 'recompose';

// UI elements
import {
    Menu,
    MenuTrigger,
    MenuOption,
    MenuOptions
} from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';
import InviteLink from '../../../../components/inviteLink';

// styles
import { chatHeaderStyles as styles } from '../styles';
const menuStyle = {
    optionsWrapper: styles.menuOptions,
    optionText: styles.menuText
};

interface IProps {
    showInvite: boolean;
    toggleInvite: (fn: (invite: boolean) => boolean) => void;
}
interface OProps {
    role: string;
    groupId: string;
}

function RightComponent(props: IProps & OProps) {
    return (
        <Menu>
            <MenuTrigger>
                <Icon
                    name="dots-three-vertical"
                    type="entypo"
                    iconStyle={styles.rightIcon}
                />
            </MenuTrigger>
            <MenuOptions customStyles={menuStyle}>
                {props.role === 'administrator' && (
                    <MenuOption
                        text="Create Invite Link"
                        onSelect={() => props.toggleInvite((si) => !si)}
                    />
                )}
                <MenuOption text="Fake Item" />
            </MenuOptions>

            {props.showInvite && <InviteLink groupId={props.groupId} />}
        </Menu>
    );
}

const enhance: CE<IProps, OProps> = compose(
    withState('showInvite', 'toggleInvite', false)
);
export default enhance(RightComponent);
