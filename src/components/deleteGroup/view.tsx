import * as React from 'react';
import Modal from 'react-native-modal';
import { MutationFn } from 'react-apollo';
import { withNavigation, NavigationInjectedProps as N } from 'react-navigation';
import { View, Text, ToastAndroid, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { modalView as styles } from './styles';

interface IProps {
    deleteFn: MutationFn;
    groupId: string;
    isOpen: boolean;
    toggle: () => void;
}

class DeleteModal extends React.Component<IProps & N> {
    state = { loading: false };
    deleteGroup = async () => {
        this.setState({ loading: true });
        try {
            await this.props.deleteFn();
            ToastAndroid.show('Group deleted', ToastAndroid.SHORT);
            this.props.toggle();
            this.props.navigation.navigate('Home');
        } catch (e) {
            ToastAndroid.show('Error deleting this group, try again', ToastAndroid.SHORT);
        }
        this.setState({ loading: false });
    };
    render() {
        const { isOpen, toggle } = this.props;
        return (
            <View style={styles.modalContainer}>
                <Modal isVisible={isOpen} onBackdropPress={toggle}>
                    <View style={styles.container}>
                        <Text style={styles.text}>
                            Are you sure you want to delete this group? There's no turning back
                        </Text>
                        <View style={styles.btnsCont}>
                            <Button
                                title="NO"
                                onPress={toggle}
                                containerViewStyle={styles.btnCont}
                                buttonStyle={styles.button}
                                textStyle={styles.btnText}
                            />
                            <Button
                                title="YES"
                                onPress={this.deleteGroup}
                                buttonStyle={[styles.button, styles.btnYes]}
                                containerViewStyle={styles.btnCont}
                                textStyle={styles.btnText}
                            />
                        </View>
                    </View>

                    {this.state.loading && <ActivityIndicator />}
                </Modal>
            </View>
        );
    }
}

export default withNavigation(DeleteModal);
