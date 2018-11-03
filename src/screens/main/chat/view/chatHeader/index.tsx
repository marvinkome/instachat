import * as React from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Header, Icon } from 'react-native-elements';

import RightComponent from './rightIcon';
import { chatHeaderStyles as styles } from '../styles';

import { contextConnect } from '../../../../../lib/context';
import context from '../../context';
import { ViewProps } from '../../types';

const LeftIcon = withNavigation((props: NavigationInjectedProps & { name: string }) => (
    <View style={styles.leftCont}>
        <TouchableNativeFeedback onPress={() => props.navigation.navigate('Home')}>
            <Icon name="ios-arrow-round-back" type="ionicon" iconStyle={styles.icon} />
        </TouchableNativeFeedback>
        <Text data-testID="username" style={styles.title}>
            {props.name}
        </Text>
    </View>
));

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
            leftComponent={<LeftIcon name={props.name} />}
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
