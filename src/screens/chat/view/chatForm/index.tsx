import * as React from 'react';
import { View, Keyboard } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { withApollo, WithApolloClient } from 'react-apollo';
import { chatFormStyles as styles } from '../styles';

import { userTyping } from './gql';

type IProps = WithApolloClient<{
    sendMessage: (data: string) => void;
    groupId: string;
}>;

type IState = {
    message: string;
};

class ChatForm extends React.Component<IProps, IState> {
    keyboardDidShowListener: any;
    keyboardDidHideListener: any;

    state = {
        message: ''
    };

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this.triggerUserTyping
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this.triggerUserNotTyping
        );
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
        this.keyboardDidShowListener.remove();
    }

    triggerUserTyping = () => {
        this.props.client.mutate({
            mutation: userTyping,
            variables: {
                groupId: this.props.groupId
            }
        });
    };
    triggerUserNotTyping = () => null;

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
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <FormInput
                        placeholder="Write a message..."
                        underlineColorAndroid="transparent"
                        inputStyle={styles.input}
                        onChangeText={this.onMessageChange}
                        value={this.state.message}
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

export default withApollo(ChatForm);
