import * as React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-elements';
import { ViewStyles as styles } from './styles';
import ListItem from './listing';

type Props = {
    lists: Array<{
        name: string;
        text: string;
        image: any;
        timestamp: string;
        unread: number;
    }>;
};

type State = {
    typing: boolean;
};

export default class MainView extends React.Component<Props, State> {
    state = {
        typing: false
    };
    render() {
        return (
            <View style={styles.container}>
                <List containerStyle={styles.listContainer}>
                    {this.props.lists.map((item, index) => (
                        <ListItem
                            key={index}
                            listItem={item}
                            typing={this.state.typing}
                        />
                    ))}
                </List>
            </View>
        );
    }
}
