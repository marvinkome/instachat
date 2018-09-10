import * as React from 'react';
import { Text, TouchableNativeFeedback } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Header, Icon } from 'react-native-elements';
import { Query } from 'react-apollo';
import { chatHeaderStyles as styles } from '../styles';
import { RightIcon } from './rightIcon';
import query from './gql';

const LeftIcon = withNavigation((props: NavigationInjectedProps) => (
    <TouchableNativeFeedback onPress={() => props.navigation.goBack()}>
        <Icon
            name="ios-arrow-round-back"
            type="ionicon"
            iconStyle={styles.icon}
        />
    </TouchableNativeFeedback>
));

const CenterComponent = ({ name }: { name: string }) => (
    <React.Fragment>
        <Text data-testID="username" style={styles.title}>
            {name}
        </Text>
        <Text data-testID="last-seen" style={styles.subtitle}>
            Last seen: 12/12/17
        </Text>
    </React.Fragment>
);

export const ChatHeader = ({
    name,
    groupId
}: {
    name: string;
    groupId: string;
}) => {
    return (
        <Query query={query} variables={{ groupId }}>
            {({ data, loading }) => {
                if (loading) {
                    return null;
                }
                const role = data.user.userGroup.role.name;
                return (
                    <Header
                        outerContainerStyles={styles.container}
                        // @ts-ignore
                        leftComponent={<LeftIcon />}
                        centerComponent={<CenterComponent name={name} />}
                        rightComponent={
                            role && <RightIcon role={role} groupId={groupId} />
                        }
                    />
                );
            }}
        </Query>
    );
};

export default ChatHeader;
