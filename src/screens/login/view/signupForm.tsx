import * as React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import FormInput from './formInput';
import { formStyles as styles } from './styles';

export default class SignUpForm extends React.Component {
    render() {
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <FormInput placholder="full name" icon="user" />
                    <FormInput placholder="email address" icon="user" />
                    <FormInput placholder="password" icon="lock" secure />
                </View>
                <Button
                    containerViewStyle={styles.btnCont}
                    textStyle={styles.btnText}
                    title="SIGNUP"
                    onPress={() => null}
                />
            </React.Fragment>
        );
    }
}
