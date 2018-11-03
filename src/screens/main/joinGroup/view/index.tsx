import * as React from 'react';
import { View } from 'react-native';
import { MutationFn } from 'react-apollo';
import Loader from '../../../../components/loader';
import { viewStyle as styles } from './styles';
import { LinkForm } from './form';

interface IProps {
    joinGroup: MutationFn;
}
export default class PageView extends React.Component<IProps> {
    state = { loading: false };
    joinLink = async (fullLink: string) => {
        const link = fullLink.split('/');
        const invite = link[link.length - 1];

        this.setState({ loading: true });
        await this.props.joinGroup({ variables: { invite } });
        this.setState({ loading: false });
    };
    render() {
        return (
            <View style={styles.container}>
                <LinkForm join={this.joinLink} />
                {this.state.loading && <Loader translucent />}
            </View>
        );
    }
}
