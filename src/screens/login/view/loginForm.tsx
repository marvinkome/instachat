import * as React from 'react';
import { View, AsyncStorage, ToastAndroid, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { auth } from '../../../lib/auth';
import FormInput from './formInput';
import { formStyles as styles } from './styles';

type IState = {
    email: string;
    password: string;
};

class LoginForm extends React.Component<NavigationInjectedProps, IState> {
    state = {
        email: '',
        password: ''
    };

    onTextChange = (field: any, value: string) => {
        // @ts-ignore
        this.setState({
            [field]: value
        });
    };

    onSubmit = async () => {
        if (!this.state.email || !this.state.password) {
            return;
        }

        try {
            const data = await auth('login', this.state);
            if (data.error) {
                // TODO set error message
                Alert.alert('Error', data.error);
                return;
            }

            // save token to storage
            await AsyncStorage.setItem('client_id', data.token);
            this.props.navigation.navigate('Home');
        } catch (e) {
            return ToastAndroid.show(
                'Error when trying to log in please try again',
                ToastAndroid.LONG
            );
        }
    };

    render() {
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <FormInput placeholder="Email" icon="mail" onChange={this.onTextChange} />
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
                    title="LOGIN"
                    onPress={this.onSubmit}
                />
            </React.Fragment>
        );
    }
}

export default withNavigation(LoginForm);
