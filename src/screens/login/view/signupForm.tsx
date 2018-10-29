import * as React from 'react';
import { View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import FormInput from './formInput';
import { formStyles as styles } from './styles';
import { auth } from '../../../lib/auth';

interface IState {
    username: string;
    email: string;
    password: string;
}

interface IProps {
    toggleView: () => void;
}

export default class SignUpForm extends React.Component<IProps, IState> {
    state = {
        username: '',
        email: '',
        password: ''
    };

    onTextChange = (field: string, value: string) => {
        // @ts-ignore
        this.setState({
            [field]: value
        });
    };

    onSubmit = async () => {
        const { username, email, password } = this.state;
        if (!username || !email || !password) {
            return;
        }

        try {
            const res = await auth('signup', this.state);
            if (res.error) {
                return Alert.alert('Error', res.error);
            }

            // signup was successfull
            // redirect to login
            Alert.alert('', 'Account has been created. Now you can login');
            this.props.toggleView();
        } catch (e) {
            return Alert.alert('Error', 'Problem when trying to create account');
        }
    };

    render() {
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <FormInput placeholder="Username" icon="user" onChange={this.onTextChange} />
                    <FormInput
                        placeholder="Email"
                        icon="mail"
                        onChange={this.onTextChange}
                    />
                    <FormInput
                        placeholder="Password"
                        icon="lock"
                        onChange={this.onTextChange}
                        secure
                    />
                </View>
                <Button
                    containerViewStyle={styles.btnCont}
                    textStyle={styles.btnText}
                    buttonStyle={styles.btn}
                    title="SIGNUP"
                    onPress={this.onSubmit}
                />
            </React.Fragment>
        );
    }
}
