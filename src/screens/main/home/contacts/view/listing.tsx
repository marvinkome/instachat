import * as React from 'react';
import List from '../../../../../components/listing';

type Props = {
    listItem: {
        onPress: () => void;
        name: string;
        about: string;
        image: any;
    };
};

const Listing = ({ listItem }: Props) => {
    return (
        <List
            avatarImg={listItem.image}
            title={listItem.name}
            subtitle={listItem.about}
            onPress={listItem.onPress}
        />
    );
};

export default Listing;
