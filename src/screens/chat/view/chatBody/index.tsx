import * as React from 'react';
import { lifecycle, compose, ComponentEnhancer as CE } from 'recompose';

// UI Elements
import { FlatList } from 'react-native';
import { List } from 'react-native-elements';
import { ChatMsg } from './listItem';

// styles
import { chatMsg as style } from './styles';

interface Props {
    loggedUser: string;
    items: Array<{
        id: string;
        from: {
            id: string;
            username: string;
        };
        message: string;
        timestamp: any;
    }>;
    subscribe: () => void;
}

export function ChatBody(props: Props) {
    return (
        <List containerStyle={style.listContainer}>
            <FlatList
                data={props.items}
                renderItem={({ item }) => <ChatMsg {...item} />}
                keyExtractor={(item) => item.id}
                inverted
            />
        </List>
    );
}

const enhanced: CE<{ loggedUser: any }, Props> = compose(
    lifecycle({
        componentDidMount() {
            // @ts-ignore
            this.props.subscribe();
        }
    })
);

export default enhanced(ChatBody);
