import * as React from 'react';
import { View } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { chatFormStyles as styles } from './styles';

type IProps = {
    sendMessage: (data: string) => void;
    offline: boolean;
};

type IState = {
    message: string;
};

export default class ChatForm extends React.Component<IProps, IState> {
    state = {
        message: ''
    };

    onMessageChange = (message: string) => {
        this.setState({
            message
        });
    };

    sendMessage = () => {
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
        });
    };

    render() {
        const placeholder = this.props.offline
            ? "Can't send messages offline"
            : 'Write a message...';
        const offlineForm = this.props.offline ? styles.offlineInput : {};
        const offlineBtn = this.props.offline ? styles.offlineBtn : {};

        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <FormInput
                        placeholder={placeholder}
                        underlineColorAndroid="transparent"
                        inputStyle={[styles.input, styles.offlineInput]}
                        onChangeText={this.onMessageChange}
                        value={this.state.message}
                        editable={false}
                        multiline
                    />
                </View>
                <View style={styles.btnCont}>
                    <Button
                        iconRight={{ name: 'md-send', type: 'ionicon' }}
                        title="BTN"
                        onPress={this.sendMessage}
                        containerViewStyle={styles.btn}
                        buttonStyle={styles.btnStyle}
                        textStyle={styles.btnText}
                        disabled
                        disabledStyle={[styles.btnStyle, offlineBtn]}
                        large
                    />
                </View>
            </View>
        );
    }
}
