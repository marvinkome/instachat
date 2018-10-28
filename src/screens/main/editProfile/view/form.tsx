import * as React from 'react';
import { FormInput, Button, FormLabel } from 'react-native-elements';
import { linkForm as styles } from './styles';

interface IProps {
    user: {
        id: string;
        username: string;
        about: string;
        email: string;
    };
    updateUser: (value: any) => void;
}

interface IState {
    username: string;
    about: string;
    email: string;
}

export class LinkForm extends React.Component<IProps, IState> {
    state = {
        username: this.props.user.username,
        about: this.props.user.about,
        email: this.props.user.email
    };

    onUpdate = () => {
        const { username, email, about } = this.state;
        const { user } = this.props;

        const value = {
            ...(user.username !== username ? { username } : {}),
            ...(user.email !== email ? { email } : {}),
            ...(user.about !== about ? { about } : {})
        };

        this.props.updateUser(value);
    };

    render() {
        return (
            <React.Fragment>
                <FormLabel labelStyle={styles.label}>Display info</FormLabel>
                <FormInput
                    onChangeText={(username) => this.setState({ username })}
                    inputStyle={styles.input}
                    value={this.state.username}
                    underlineColorAndroid="hsl(0, 0%, 70%)"
                    placeholder="Username"
                    maxLength={24}
                />
                <FormInput
                    onChangeText={(about) => this.setState({ about })}
                    inputStyle={styles.input}
                    value={this.state.about}
                    underlineColorAndroid="hsl(0, 0%, 70%)"
                    placeholder="Write something about yourself"
                    maxLength={128}
                    multiline
                />

                <FormLabel labelStyle={styles.label}>Personal Info</FormLabel>
                <FormInput
                    onChangeText={(email) => this.setState({ email })}
                    inputStyle={styles.input}
                    value={this.state.email}
                    underlineColorAndroid="hsl(0, 0%, 70%)"
                    keyboardType="email-address"
                    maxLength={64}
                    placeholder="Email"
                />
                <Button
                    title={'update'.toUpperCase()}
                    onPress={this.onUpdate}
                    containerViewStyle={styles.buttonCont}
                    buttonStyle={styles.button}
                />
            </React.Fragment>
        );
    }
}
