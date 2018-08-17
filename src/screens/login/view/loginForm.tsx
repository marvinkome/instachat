import * as React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { auth } from '../../../lib/auth';
import FormInput from './formInput';
import { formStyles as styles } from './styles';

type IState = {
    email: string;
    password: string;
};

export default class SignUpForm extends React.Component<{}, IState> {
    state = {
        email: '',
        password: ''
    };

    onTextChange = (field: any, value: string) => {
        this.setState({
            [field]: value
        });
    };

    onSubmit = async () => {
        if (!this.state.email || !this.state.password) {
            return;
        }

        const data = await auth('login', this.state);

        if (data.error) {
            // TODO set error message
            return;
        }

        // save token to storage
        try {
            // AsyncStorage.setItem('client_id', data.payload);
        } catch {
            // TODO set error saving data
        }
    };

    render() {
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <FormInput
                        placeholder="email"
                        icon="user"
                        onChange={this.onTextChange}
                    />
                    <FormInput
                        placeholder="password"
                        icon="lock"
                        onChange={this.onTextChange}
                        secure
                    />
                </View>
                <Button
                    containerViewStyle={styles.btnCont}
                    textStyle={styles.btnText}
                    title="LOGIN"
                    onPress={this.onSubmit}
                />
            </React.Fragment>
        );
    }
}
