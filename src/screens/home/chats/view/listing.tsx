import * as React from 'react';
import List from '../../../../components/listing';
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

const Listing = ({ listItem, typing }: Props) => {
    const subtitleStyle = typing ? { color: color.primary } : {};
    return (
        <List
            avatar={listItem.image}
            title={listItem.name}
            subtitle={typing ? 'typing...' : listItem.text}
            subtitleStyle={subtitleStyle}
            badgeText={listItem.timestamp}
            badgeValue={3}
            showBadge
        />
    );
};

export default Listing;
