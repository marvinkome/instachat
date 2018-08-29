import * as React from 'react';
import { Text, TouchableNativeFeedback } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Header, Icon } from 'react-native-elements';
import { chatHeaderStyles as styles } from './styles';

const LeftIcon = withNavigation((props: NavigationInjectedProps) => (
    <TouchableNativeFeedback onPress={() => props.navigation.goBack()}>
        <Icon
            name="ios-arrow-round-back"
            type="ionicon"
            iconStyle={styles.icon}
        />
    </TouchableNativeFeedback>
));

const CenterComponent = () => (
    <React.Fragment>
        <Text data-testID="username" style={styles.title}>
            Larry Doe
        </Text>
        <Text data-testID="last-seen" style={styles.subtitle}>
            Last seen: 12/12/17
        </Text>
    </React.Fragment>
);

export const ChatHeader = () => {
    return (
        <Header
            outerContainerStyles={styles.container}
            leftComponent={<LeftIcon />}
            centerComponent={<CenterComponent />}
        />
    );
};

export default ChatHeader;
