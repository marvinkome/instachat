import * as React from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { chatMsg as styles } from './styles';
import { formatDate } from '../../../../lib/helpers';

const avatarImg = require('../../../../../static/yuna.jpg');

interface Props {
    id: string;
    from: {
        id: string;
        username: string;
    };
    message: string;
    timestamp: string;
}

export function ChatMsg(props: Props) {
    const optimistic = Number(props.id) < 0;
    const subtitle = <Text style={styles.message}>{props.message}</Text>;
    const title = (
        <Text style={styles.titleStyle}>
            {props.from.username}{' '}
            <Text style={styles.timestamp}>
                {formatDate(Number(props.timestamp), true)}
            </Text>
        </Text>
    );
    const optimisticStyle = optimistic
        ? {
              backgroundColor: 'hsl(0,0%,96%)'
          }
        : {};

    return (
        <ListItem
            title={title}
            subtitle={subtitle}
            hideChevron
            roundAvatar
            avatar={avatarImg}
            containerStyle={[styles.itemContainer, optimisticStyle]}
            wrapperStyle={styles.container}
            titleStyle={styles.titleStyle}
        />
    );
}
