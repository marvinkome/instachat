import * as React from 'react';
import { Text, TouchableNativeFeedback } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Header, Icon } from 'react-native-elements';

import RightComponent from './rightIcon';
import { chatHeaderStyles as styles } from '../styles';

import { contextConnect } from '../../../../../lib/context';
import context from '../../context';
import { ViewProps } from '../../types';

// TODO: add wave effect
const LeftIcon = withNavigation((props: NavigationInjectedProps) => (
    <TouchableNativeFeedback onPress={() => props.navigation.goBack()}>
        <Icon name="ios-arrow-round-back" type="ionicon" iconStyle={styles.icon} />
    </TouchableNativeFeedback>
));

const CenterComponent = ({ name }: { name: string }) => (
    <Text data-testID="username" style={styles.title}>
        {name}
    </Text>
);

interface Props {
    name: string;
    role: string;
    groupId: string;
}
export const ChatHeader = (props: Props) => {
    return (
        <Header
            outerContainerStyles={styles.container}
            // @ts-ignore
            leftComponent={<LeftIcon />}
            centerComponent={<CenterComponent name={props.name} />}
            rightComponent={<RightComponent role={props.role} groupId={props.groupId} />}
        />
    );
};

function mapContextToProps(store: ViewProps) {
    return {
        name: store.group.name,
        role: store.group.role.name,
        groupId: store.group.id
    };
}

export default contextConnect(context, mapContextToProps)(ChatHeader);
