import * as React from 'react';
import theme from '../../lib/colors';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';

type Props = { translucent?: boolean; message?: string };
export default class Loader extends React.Component<Props> {
    render() {
        const bg = this.props.translucent
            ? [style.trans, { backgroundColor: 'hsla(0, 100%, 100%, 0.15)' }]
            : { backgroundColor: theme.primary.regular };
        return (
            <View style={[style.loader, bg]}>
                <ActivityIndicator size="large" color={theme.secondary.regular} />
                {this.props.message && <Text style={style.msg}>{this.props.message}</Text>}
            </View>
        );
    }
}

const style = StyleSheet.create({
    trans: {
        position: 'absolute',
        zIndex: 3,
        height: '100%',
        width: '100%',
        alignSelf: 'center'
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    msg: {
        marginTop: 10,
        color: theme.primary.typo.sub,
        fontFamily: theme.fontRegular,
        fontSize: 14
    }
});
