import * as React from 'react';
import theme from '../../lib/colors';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-elements';

const img = require('../../../static/error.png');
type Props = { translucent?: boolean; message?: string };

export default class ErrorView extends React.Component<Props> {
    render() {
        return (
            <View style={style.loader}>
                <Avatar overlayContainerStyle={style.image} source={img} large />
                {this.props.message && <Text style={style.msg}>{this.props.message}</Text>}
            </View>
        );
    }
}

const style = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        backgroundColor: 'transparent'
    },
    msg: {
        marginTop: 10,
        color: theme.primary.typo.sub,
        fontFamily: theme.fontRegular,
        fontSize: 14
    }
});
