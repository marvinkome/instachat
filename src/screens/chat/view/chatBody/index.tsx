import * as React from 'react';
import { lifecycle, compose, ComponentEnhancer as CE } from 'recompose';

// UI Elements
import { ScrollView } from 'react-native';
import ChatItem from './chatItem';

// styles
import { chatBodyStyles as styles } from '../styles';

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
    let scrollRef: ScrollView;
    return (
        <ScrollView
            style={styles.container}
            ref={(ref: any) => (scrollRef = ref)}
            onContentSizeChange={() => {
                scrollRef.scrollToEnd({ animated: false });
            }}
        >
            {props.items.map((item, index, array) => (
                <ChatItem
                    item={item}
                    nextItem={array[index + 1]}
                    currentUser={props.loggedUser}
                    key={item.id}
                />
            ))}
        </ScrollView>
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
