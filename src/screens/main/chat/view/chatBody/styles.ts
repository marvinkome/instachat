import { StyleSheet } from 'react-native';
import colors from '../../../../lib/colors';

export const chatMsg = StyleSheet.create({
    listContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        marginTop: 10
    },
    itemContainer: {
        borderBottomWidth: 0,
        paddingLeft: 5,
        paddingBottom: 20
    },
    container: {
        alignItems: 'flex-start'
    },
    titleStyle: {
        fontWeight: '500',
        fontFamily: 'PT_Sans',
        fontSize: 16,
        marginLeft: 10
    },
    message: {
        color: colors.text_light,
        fontSize: 14,
        marginTop: 2,
        marginLeft: 10,
        fontFamily: 'PT_Sans'
    },
    timestamp: {
        color: '#86939e',
        fontSize: 12,
        marginTop: 1,
        marginLeft: 10,
        fontWeight: 'normal',
        fontFamily: 'PT_Sans'
    },
    typingIndicator: {
        fontFamily: 'PT_Sans',
        color: colors.text_light,
        marginLeft: 20,
        fontSize: 12
    }
});
