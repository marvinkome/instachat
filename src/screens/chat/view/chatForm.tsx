import * as React from 'react';
import { View } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { chatFormStyles as styles } from './styles';

type IProps = {
    sendMessage: (data: string) => void;
};

type IState = {
    message: string;
};

export class ChatForm extends React.Component<IProps, IState> {
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
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <FormInput
                        placeholder="Write a message..."
                        underlineColorAndroid="transparent"
                        inputStyle={styles.input}
                        onChangeText={this.onMessageChange}
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
                        large
                    />
                </View>
            </View>
        );
    }
}
