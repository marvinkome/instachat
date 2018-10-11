import * as React from 'react';
import { View } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { withApollo, WithApolloClient } from 'react-apollo';
import { chatFormStyles as styles } from '../styles';

import { setTypingState } from './gql';

type IProps = WithApolloClient<{
    sendMessage: (data: string) => void;
    groupId: string;
}>;

type IState = {
    message: string;
};

class ChatForm extends React.Component<IProps, IState> {
    stopTypingTimeout: NodeJS.Timer | undefined = undefined;
    isTyping: boolean = false;

    state = {
        message: ''
    };

    setTypingState = async (state: boolean) => {
        try {
            await this.props.client.mutate({
                mutation: setTypingState,
                variables: {
                    groupId: this.props.groupId,
                    state
                },
            });
        } catch (e) {
            return;
        }
    };

    resetStopTypingTimeout = () => {
        if (this.stopTypingTimeout) {
            clearTimeout(this.stopTypingTimeout);
        }

        this.stopTypingTimeout = setTimeout(() => {
            this.isTyping = false;
            this.setTypingState(this.isTyping);
            this.stopTypingTimeout = undefined;
        }, 3000);
    };

    onMessageChange = (message: string) => {
        const stateCb = () => {
            const isMsgEmpty = this.state.message.length === 0;
            if (isMsgEmpty === false) {
                if (this.isTyping === false) {
                    this.isTyping = true;
                    this.setTypingState(true);
                    this.resetStopTypingTimeout();
                } else {
                    this.resetStopTypingTimeout();
                }
            } else {
                if (this.isTyping === true) {
                    this.isTyping = false;
                    this.setTypingState(this.isTyping);

                    if (this.stopTypingTimeout) {
                        clearTimeout(this.stopTypingTimeout);
                        this.stopTypingTimeout = undefined;
                    }
                }
            }
        };

        this.setState(
            {
                message
            },
            stateCb
        );
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
