import * as React from 'react';
import { View } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { chatFormStyles as styles } from './styles';

export const ChatForm = () => {
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <FormInput
                    placeholder="Write a message..."
                    underlineColorAndroid="transparent"
                    inputStyle={styles.input}
                    multiline
                />
            </View>
            <View style={styles.btnCont}>
                <Button
                    iconRight={{ name: 'md-send', type: 'ionicon' }}
                    title="BTN"
                    onPress={() => null}
                    containerViewStyle={styles.btn}
                    buttonStyle={styles.btnStyle}
                    textStyle={styles.btnText}
                    large
                />
            </View>
        </View>
    );
};
