import * as React from 'react';
import _ from 'lodash';
import moment from 'moment';

// UI Elements
import { FlatList } from 'react-native';
import { List } from 'react-native-elements';
import Hr from '../../../../components/Hr';
import { ChatMsg } from './listItem';

// styles
import { chatMsg as style } from './styles';

export interface Props {
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

function RenderItem(props: any) {
    return props.item.messages.map((item: any) => (
        <ChatMsg key={item.id} {...item} />
    ));
}

export function ChatBody(props: Props) {
    const data = _.chain(props.items)
        .groupBy((item) => new Date(Number(item.timestamp)).toDateString())
        .map((messages, timestamp) => ({ messages, timestamp }))
        .value();

    return (
        <List containerStyle={style.listContainer}>
            <FlatList
                data={data}
                renderItem={RenderItem}
                ItemSeparatorComponent={({ leadingItem }) => (
                    <Hr
                        text={moment(
                            leadingItem.timestamp,
                            'ddd MMM DD YYYY'
                        ).format('D MMM Y')}
                    />
                )}
                keyExtractor={(item) => item.timestamp}
                inverted
            />
        </List>
    );
}
