import * as React from 'react';
import { View } from 'react-native';
import { MutationFn } from 'react-apollo';
import { viewStyle as styles } from './styles';
import { LinkForm } from './form';

interface IProps {
    joinGroup: MutationFn;
}
export default class PageView extends React.Component<IProps> {
    joinLink = async (fullLink: string) => {
        const link = fullLink.split('/');
        const invite = link[link.length - 1];
        this.props.joinGroup({ variables: { invite } });
    };
    render() {
        return (
            <View style={styles.container}>
                <LinkForm join={this.joinLink} />
            </View>
        );
    }
}
