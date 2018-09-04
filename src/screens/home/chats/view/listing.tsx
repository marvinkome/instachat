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
        unread: number;
    };
};

const Listing = ({ listItem, typing }: Props) => {
    const subtitleStyle = typing ? { color: color.primary } : {};
    return (
        <List
            avatarImg={listItem.image}
            title={listItem.name}
            subtitle={typing ? 'typing...' : listItem.text}
            subtitleStyle={subtitleStyle}
            badgeText={listItem.timestamp}
            badgeValue={listItem.unread}
            showBadge
        />
    );
};

export default Listing;
