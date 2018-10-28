import * as React from 'react';
import { View, ToastAndroid } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { groupForm as styles } from './styles';

interface IState {
    name: string;
    topic: string;
}

interface IProps {
    createGroup: (data: { name: string; topic?: string }) => void;
}

export class GroupForm extends React.Component<IProps, IState> {
    state = {
        name: '',
        topic: ''
    };

    onTextChange = (text: string, field: string) => {
        // @ts-ignore
        this.setState({
            [field]: text
        });
    };

    onCreateGroup = () => {
        const { name, topic } = this.state;

        // check if name is empty
        if (!name.length) {
            return ToastAndroid.show('Group name is required.', ToastAndroid.LONG);
        }

        topic.length ? this.props.createGroup({ name, topic }) : this.props.createGroup({ name });
    };

    render() {
        return (
            <React.Fragment>
                <View>
                    <FormLabel labelStyle={styles.label}>Group name</FormLabel>
                    <FormInput
                        placeholder="eg. Thinkers lodge"
                        inputStyle={styles.input}
                        onChangeText={(text) => this.onTextChange(text, 'name')}
                        underlineColorAndroid="hsl(0, 0%, 70%)"
                        value={this.state.name}
                    />
                </View>
                <View>
                    <FormLabel labelStyle={styles.label}>Group Description (optional)</FormLabel>
                    <FormInput
                        inputStyle={styles.input}
                        underlineColorAndroid="hsl(0, 0%, 70%)"
                        onChangeText={(text) => this.onTextChange(text, 'topic')}
                    />
                </View>
                <Button
                    title={'Create'.toUpperCase()}
                    onPress={this.onCreateGroup}
                    containerViewStyle={styles.buttonCont}
                    buttonStyle={styles.button}
                />
            </React.Fragment>
        );
    }
}
