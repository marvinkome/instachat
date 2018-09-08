import * as React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { groupForm as styles } from './styles';

export class GroupForm extends React.Component {
    render() {
        return (
            <React.Fragment>
                <View>
                    <FormLabel labelStyle={styles.label}>Group name</FormLabel>
                    <FormInput
                        placeholder="eg. Thinkers lodge"
                        inputStyle={styles.input}
                    />
                </View>
                <Button
                    title={'Create'.toUpperCase()}
                    onPress={() => null}
                    containerViewStyle={styles.buttonCont}
                    buttonStyle={styles.button}
                />
            </React.Fragment>
        );
    }
}
