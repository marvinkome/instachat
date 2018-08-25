import * as React from 'react';
import { View, Text } from 'react-native';
import LoginForm from './loginForm';
import SignUpForm from './signupForm';
import { viewStyles as styles } from './styles';

type IState = {
    signUpView: boolean;
};

export default class PageView extends React.Component<{}, IState> {
    state = {
        signUpView: false
    };
    toggleView = () => {
        this.setState({
            signUpView: !this.state.signUpView
        });
    };
    render() {
        let logoText = 'Welcome to instaChat';
        let formComp = <SignUpForm data-testid="signUpForm" />;
        let bottomText = 'Have an account?';
        let bottomCta = 'Login';

        if (!this.state.signUpView) {
            logoText = 'Login to instaChat';
            formComp = <LoginForm data-testid="loginForm" />;
            bottomText = "Don't Have an account?";
            bottomCta = 'Sign up';
        }

        return (
            <View style={styles.container}>
                <Text style={styles.logoText}>{logoText}</Text>
                {formComp}
                <Text style={styles.bottomText}>
                    {bottomText}{' '}
                    <Text
                        data-testid="change-view"
                        onPress={this.toggleView}
                        style={styles.bottomCta}
                    >
                        {bottomCta}
                    </Text>
                </Text>
            </View>
        );
    }
}
