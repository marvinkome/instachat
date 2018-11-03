import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { uploadImage, showImagePicker } from '../../../../lib/helpers';
import Loader from '../../../../components/loader';

import { viewStyle as styles } from './styles';
import { LinkForm } from './form';

interface IProps {
    user: {
        id: string;
        username: string;
        about: string;
        email: string;
        profilePic: string;
    };
    updateUser: (value: any) => void;
}

export default class PageView extends React.Component<IProps> {
    state = {
        imageUrl: '',
        loading: false
    };

    showPicker = async () => {
        try {
            const data = await showImagePicker('Select profile picture');
            const imageUrl = await uploadImage(data.path, data.name);
            if (!imageUrl) {
                return;
            }

            this.setState({ imageUrl });
        } catch (e) {
            return;
        }
    };

    updateUser = async (user: any) => {
        this.setState({ loading: true });
        await this.props.updateUser({ ...user, ...this.state });
        this.setState({ loading: false });
    };

    render() {
        const avatarProps = {
            ...(!this.props.user.profilePic
                ? {
                      ...(this.state.imageUrl.length
                          ? { source: { uri: this.state.imageUrl } }
                          : { title: this.props.user.username.slice(0, 2).toUpperCase() })
                  }
                : { source: { uri: this.props.user.profilePic } })
        };

        return (
            <ScrollView style={styles.container}>
                <View style={styles.avatar}>
                    <Avatar rounded large onPress={this.showPicker} {...avatarProps} />
                </View>
                <LinkForm user={this.props.user} updateUser={this.updateUser} />

                {this.state.loading && <Loader translucent />}
            </ScrollView>
        );
    }
}
