import * as React from 'react';
import { View, Alert } from 'react-native';
import { Button } from 'react-native-elements';

import Loader from '../../../components/loader';
import FormInput from './formInput';
import { formStyles as styles } from './styles';
import { auth } from '../../../lib/auth';

interface IState {
    loading: boolean;
    username: string;
    email: string;
    password: string;
}

interface IProps {
    toggleView: () => void;
}

export default class SignUpForm extends React.Component<IProps, IState> {
    state = {
        loading: false,
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
        const { loading, ...state } = this.state;

        // validate inputs
        if (!state.username || !state.email || !state.password) {
            return Alert.alert('', 'Email, Username and Password is required');
        }

        // show loader
        this.setState({ loading: true });

        try {
            const res = await auth('signup', state);

            // show error from server
            if (res.error) {
                this.setState({ loading: false });
                return Alert.alert('Error', res.error);
            }

            // signup was successfull, redirect to login
            this.setState({ loading: false });
            Alert.alert('', 'Account has been created. Now you can login');
            this.props.toggleView();
        } catch (e) {
            this.setState({ loading: false });
            return Alert.alert(
                'Error',
                'Problem when trying to create account. Check your internet connectiion and try again.'
            );
        }
    };

    render() {
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <FormInput placeholder="Username" icon="user" onChange={this.onTextChange} />
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
                    title="SIGNUP"
                    onPress={this.onSubmit}
                />
                {this.state.loading && <Loader translucent />}
            </React.Fragment>
        );
    }
}
