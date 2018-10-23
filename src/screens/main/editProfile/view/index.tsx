import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { viewStyle as styles } from './styles';
import { LinkForm } from './form';

interface IProps {
    user: {
        id: string;
        username: string;
        about: string;
        email: string;
    };
    updateUser: (value: any) => void;
}
export default class PageView extends React.Component<IProps> {
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.avatar}>
                    <Avatar
                        rounded={true}
                        large={true}
                        source={require('../../../../static/pp.jpg')}
                    />
                </View>
                <LinkForm user={this.props.user} updateUser={this.props.updateUser} />
            </ScrollView>
        );
    }
}
