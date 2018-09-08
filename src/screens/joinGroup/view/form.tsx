import * as React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { linkForm as styles } from './styles';

export class LinkForm extends React.Component {
    render() {
        return (
            <React.Fragment>
                <View>
                    <FormLabel labelStyle={styles.label}>Invite Link</FormLabel>
                    <FormInput
                        inputStyle={styles.input}
                        placeholder="http://testlink.com/linkid"
                    />
                </View>
                <Button
                    title={'Join'.toUpperCase()}
                    onPress={() => null}
                    containerViewStyle={styles.buttonCont}
                    buttonStyle={styles.button}
                />
            </React.Fragment>
        );
    }
}
