import * as React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { viewStyle as styles } from './styles';
import { ImageForm } from './imageForm';
import { GroupForm } from './form';

export default class PageView extends React.Component {
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="position">
                <ImageForm />
                <GroupForm />
            </KeyboardAvoidingView>
        );
    }
}
