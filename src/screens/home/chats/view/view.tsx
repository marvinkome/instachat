import * as React from 'react';
import { View, Text } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { List, Icon } from 'react-native-elements';
import Fab from 'react-native-action-button';
import { ViewStyles as styles } from './styles';
import ListItem from './listing';
import color from '../../../../lib/colors';

interface Props {
    lists: Array<{
        name: string;
        text: string;
        image: any;
        timestamp: string;
        unread: number;
        onPress: () => void;
    }>;
}

type State = {
    typing: boolean;
};

function renderEmptyGroupList() {
    return (
        <View style={styles.emptyView}>
            <Text style={styles.emptyText}>
                No chats available. Click the button below to start a group chat
            </Text>
        </View>
    );
}

class MainView extends React.Component<Props & NavigationInjectedProps, State> {
    state = {
        typing: false
    };
    render() {
        return (
            <View style={styles.container}>
                {this.props.lists.length ? (
                    <List containerStyle={styles.listContainer}>
                        {this.props.lists.map((item, index) => (
                            <ListItem
                                key={index}
                                listItem={item}
                                typing={this.state.typing}
                            />
                        ))}
                    </List>
                ) : (
                    renderEmptyGroupList()
                )}
                <Fab buttonColor={color.primary}>
                    <Fab.Item
                        buttonColor={color.primary}
                        title="Create Group"
                        onPress={() =>
                            this.props.navigation.navigate('NewGroup')
                        }
                    >
                        <Icon name="group" color="#fff" />
                    </Fab.Item>
                    <Fab.Item
                        buttonColor={color.primary}
                        title="Join Group"
                        onPress={() =>
                            this.props.navigation.navigate('JoinGroup')
                        }
                    >
                        <Icon name="group-add" color="#fff" />
                    </Fab.Item>
                </Fab>
            </View>
        );
    }
}

export default withNavigation(MainView);
