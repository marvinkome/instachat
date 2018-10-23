import * as React from 'react';
import Fab from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import color from '../../../../../lib/colors';

interface IProps {
    navigate: (to: string, params?: any) => boolean;
}

export function GroupFab(props: IProps) {
    return (
        <Fab buttonColor={color.primary}>
            <Fab.Item
                buttonColor={color.primary}
                title="Create Group"
                onPress={() => props.navigate('NewGroup')}
            >
                <Icon name="group" color="#fff" />
            </Fab.Item>
            <Fab.Item
                buttonColor={color.primary}
                title="Join Group"
                onPress={() => props.navigate('JoinGroup')}
            >
                <Icon name="group-add" color="#fff" />
            </Fab.Item>
        </Fab>
    );
}
