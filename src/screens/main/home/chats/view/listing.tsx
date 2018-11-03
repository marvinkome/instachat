import * as React from 'react';
import { Avatar } from 'react-native-elements';

// components
import List from '../../../../../components/listing';
import DeleteModal from '../../../../../components/deleteGroup';

// lib
import color from '../../../../../lib/colors';

// types
import { ListingType } from '../types';

type Props = {
    typing: boolean;
    listItem: ListingType;
};

class Listing extends React.Component<Props> {
    state = {
        showDeleteModal: false
    };

    exists = true;

    toggleDeleteModal = () => {
        if (this.exists) {
            this.setState({
                showDeleteModal: !this.state.showDeleteModal
            });
        }
    };

    componentWillUnmount() {
        this.exists = false;
    }

    render() {
        const { listItem } = this.props;
        const subtitleStyle = listItem.typing ? { color: color.secondary.light } : {};
        return (
            <React.Fragment>
                <List
                    avatarImg={<Avatar small rounded {...listItem.image} />}
                    title={listItem.name}
                    subtitle={listItem.text}
                    subtitleStyle={subtitleStyle}
                    badgeText={listItem.timestamp}
                    badgeValue={listItem.unread}
                    onPress={listItem.onPress}
                    onLongPress={
                        listItem.role === 'administrator' ? this.toggleDeleteModal : undefined
                    }
                    showBadge={listItem.unread !== null && listItem.unread > 0}
                />

                {this.state.showDeleteModal && (
                    <DeleteModal
                        isOpen={this.state.showDeleteModal}
                        groupId={listItem.id}
                        toggle={this.toggleDeleteModal}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default Listing;
