import * as React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Badge, Avatar } from 'react-native-elements';
import { ViewStyles as styles } from './styles';
import color from '../../../../lib/colors';

type Props = {
    typing: boolean;
    listItem: {
        name: string;
        text: string;
        image: any;
        timestamp: string;
    };
};
const MainListItem = ({ listItem: item, typing }: Props) => {
    const subtitleStyle = typing
        ? [{ color: color.primary }, styles.message]
        : styles.message;

    return (
        <ListItem
            containerStyle={styles.listItemContainer}
            avatar={<Avatar small rounded source={item.image} />}
            title={item.name}
            titleStyle={styles.name}
            subtitle={typing ? 'typing...' : item.text}
            subtitleStyle={subtitleStyle}
            hideChevron
            badge={{
                element: (
                    <View style={styles.rightContainer}>
                        <Text style={styles.time}>{item.timestamp}</Text>
                        <Badge
                            value={3}
                            containerStyle={styles.badgeContainer}
                            textStyle={styles.badgeText}
                        />
                    </View>
                )
            }}
        />
    );
};

export default MainListItem;
