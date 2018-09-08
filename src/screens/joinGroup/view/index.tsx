import * as React from 'react';
import { View } from 'react-native';
import { viewStyle as styles } from './styles';
import { LinkForm } from './form';

export default class PageView extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <LinkForm />
            </View>
        );
    }
}
