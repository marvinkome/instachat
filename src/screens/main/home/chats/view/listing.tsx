import * as React from 'react';
import { Avatar } from 'react-native-elements';

// components
import List from '../../../../../components/listing';

// lib
import color from '../../../../../lib/colors';

// types
import { ListingType } from '../types';

type Props = {
    typing: boolean;
    listItem: ListingType;
};

const Listing = ({ listItem }: Props) => {
    const subtitleStyle = listItem.typing ? { color: color.secondary.light } : {};
    return (
        <List
            avatarImg={<Avatar small rounded {...listItem.image} />}
            title={listItem.name}
            subtitle={listItem.text}
            subtitleStyle={subtitleStyle}
            badgeText={listItem.timestamp}
            badgeValue={listItem.unread}
            onPress={listItem.onPress}
            showBadge={listItem.unread !== null && listItem.unread > 0}
        />
    );
};

export default Listing;
