import * as React from 'react';
import { Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { chatMsg as styles } from './styles';
import { formatDate } from '../../../../../lib/helpers';

interface Props {
    id: string;
    from: {
        id: string;
        username: string;
        profilePic: string;
    };
    message: string;
    timestamp: string;
}

const isError = (id: number) => -100 > id && id > -200;
const isOptimistic = (id: number) => 0 > id && id > -100;

export function ChatMsg(props: Props) {
    const optimisticStyle = isOptimistic(Number(props.id))
        ? {
              backgroundColor: 'hsl(0,0%,96%)'
          }
        : {};

    const errorStyle = isError(Number(props.id))
        ? {
              color: 'red'
          }
        : {};

    const subtitle = (
        <React.Fragment>
            <Text style={[styles.message, errorStyle]}>{props.message}</Text>
            {isError(Number(props.id)) && (
                <Text
                    style={[
                        styles.message,
                        errorStyle,
                        {
                            fontSize: 12
                        }
                    ]}
                >
                    Failed to send message
                </Text>
            )}
        </React.Fragment>
    );
    const title = (
        <Text style={styles.titleStyle}>
            {props.from.username}{' '}
            <Text style={styles.timestamp}>{formatDate(Number(props.timestamp), true)}</Text>
        </Text>
    );

    const avatarProps = {
        ...(!props.from.profilePic
            ? { title: props.from.username.slice(0, 2).toUpperCase() }
            : { source: { uri: props.from.profilePic } })
    };

    return (
        <ListItem
            title={title}
            subtitle={subtitle}
            hideChevron
            avatar={<Avatar rounded {...avatarProps} />}
            containerStyle={[styles.itemContainer, optimisticStyle]}
            wrapperStyle={styles.container}
            titleStyle={styles.titleStyle}
        />
    );
}
