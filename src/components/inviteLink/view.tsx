import * as React from 'react';
import Modal from 'react-native-modal';
import { MutationFn } from 'react-apollo';
import { withNavigation, NavigationInjectedProps as N } from 'react-navigation';
import { View, Text, Clipboard, ToastAndroid, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { modalView as styles } from './styles';

interface IProps {
    createInvite: MutationFn;
    groupId: string;
    enableGroupLink?: boolean;
}
interface IState {
    showModal: boolean;
    invite: string;
    loading: boolean;
}

class InviteModal extends React.Component<IProps & N, IState> {
    state = {
        showModal: true,
        invite: '',
        loading: true
    };

    async componentDidMount() {
        const res = await this.props.createInvite();
        if (!res) {
            return;
        }
        const invite = res.data.createInvite;
        this.setState({ invite, loading: false });
    }

    toggleVisibility = () => {
        this.setState({
            showModal: false
        });
    };

    copyLink = async () => {
        await Clipboard.setString(this.state.invite);
        ToastAndroid.show('Link copied', ToastAndroid.SHORT);
    };

    goToGroup = () => {
        this.setState({
            showModal: false
        });
        this.props.navigation.navigate('Chat', { groupId: this.props.groupId });
    };

    render() {
        const { showModal, loading } = this.state;
        return (
            <View style={styles.modalContainer}>
                <Modal isVisible={showModal} onBackdropPress={this.toggleVisibility}>
                    {loading ? (
                        <ActivityIndicator />
                    ) : (
                        <View style={styles.container}>
                            <Text style={styles.text}>
                                Share invite link to users to join your group
                            </Text>
                            <View>
                                <Text
                                    style={styles.link}
                                    numberOfLines={1}
                                    onLongPress={this.copyLink}
                                >
                                    {this.state.invite}
                                </Text>
                            </View>
                            <Button
                                title={'copy link'.toUpperCase()}
                                onPress={this.copyLink}
                                buttonStyle={styles.button}
                            />

                            {this.props.enableGroupLink && (
                                <Text style={styles.cta} onPress={this.goToGroup}>
                                    Go to group
                                </Text>
                            )}
                        </View>
                    )}
                </Modal>
            </View>
        );
    }
}

export default withNavigation(InviteModal);
