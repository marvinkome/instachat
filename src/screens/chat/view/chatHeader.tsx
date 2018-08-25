import * as React from 'react';
import { Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { chatHeaderStyles as styles } from './styles';

const LeftIcon = () => (
    <Icon name="ios-arrow-round-back" type="ionicon" iconStyle={styles.icon} />
);

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
