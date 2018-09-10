import * as React from 'react';
import { View } from 'react-native';
import fetch from '../../../lib/fetch';
import { viewStyle as styles } from './styles';
import { LinkForm } from './form';

export default class PageView extends React.Component {
    joinLink = async (link: string) => {
        try {
            const resp = await (await fetch(link, {})).json();
            console.warn(resp);
        } catch (e) {
            console.warn(e.message);
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <LinkForm join={this.joinLink} />
            </View>
        );
    }
}
