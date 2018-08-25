import * as React from 'react';
import List from '../../../../components/listing';

type Props = {
    listItem: {
        name: string;
        about: string;
        image: any;
    };
};

const Listing = ({ listItem }: Props) => {
    return (
        <List
            avatar={listItem.image}
            title={listItem.name}
            subtitle={listItem.about}
        />
    );
};

export default Listing;
