import * as React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { linkForm as styles } from './styles';

interface IProps {
    join: (link: string) => void;
}

interface IState {
    link: string;
}

export class LinkForm extends React.Component<IProps, IState> {
    state = {
        link: ''
    };
    render() {
        return (
            <React.Fragment>
                <View>
                    <FormLabel labelStyle={styles.label}>Invite Link</FormLabel>
                    <FormInput
                        onChangeText={(link) => this.setState({ link })}
                        inputStyle={styles.input}
                        underlineColorAndroid="hsl(0, 0%, 70%)"
                        placeholder="http://testlink.com/linkid"
                    />
                </View>
                <Button
                    title={'Join'.toUpperCase()}
                    onPress={() => this.props.join(this.state.link)}
                    containerViewStyle={styles.buttonCont}
                    buttonStyle={styles.button}
                />
            </React.Fragment>
        );
    }
}
