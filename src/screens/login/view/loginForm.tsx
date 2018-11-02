import * as React from 'react';
import { View, AsyncStorage, ToastAndroid, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

import Loader from '../../../components/loader';
import { auth } from '../../../lib/auth';
import FormInput from './formInput';
import { formStyles as styles } from './styles';

type IState = {
    loading: boolean;
    email: string;
    password: string;
};

class LoginForm extends React.Component<NavigationInjectedProps, IState> {
    state = {
        loading: false,
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
        const { loading, ...state } = this.state;

        // validate inputs
        if (!state.email || !state.password) {
            return Alert.alert('', 'Email and password is required');
        }

        // show loader
        this.setState({ loading: true });

        try {
            const data = await auth('login', state);

            // show error from server
            if (data.error) {
                this.setState({ loading: false });
                return Alert.alert('Error', data.error);
            }

            // save token to storage, hide loader amd move to home screen
            await AsyncStorage.setItem('client_id', data.token);
            this.setState({ loading: false });
            this.props.navigation.navigate('Main');
        } catch (e) {
            this.setState({ loading: false });
            return ToastAndroid.show(
                'Error when trying to log in. Check your internet connectiion and try again.',
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
                {this.state.loading && <Loader translucent />}
            </React.Fragment>
        );
    }
}

export default withNavigation(LoginForm);
