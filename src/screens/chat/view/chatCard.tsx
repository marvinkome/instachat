import * as React from 'react';
import { Text, Card, CardItem, Body } from 'native-base';
import { chatCardStyles as styles } from './styles';

type Props = {
    item: {
        name: string;
        text: string;
        time: string;
    };
};

export const ChatCard = ({ item }: Props) => {
    let cardStyle = {};

    if (item.name === 'you') {
        cardStyle = {
            alignSelf: 'flex-end'
        };
    }

    return (
        <Card style={[styles.card, cardStyle]} transparent>
            <CardItem style={styles.cardItemHeader} header bordered>
                <Text numberOfLines={1}>{item.name}</Text>
            </CardItem>
            <CardItem style={styles.cardItemBody}>
                <Body>
                    <Text>{item.text}</Text>
                </Body>
            </CardItem>
            <CardItem style={styles.cardItemTime} footer bordered>
                <Text style={styles.time}>{item.time}</Text>
            </CardItem>
        </Card>
    );
};
