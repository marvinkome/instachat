import { StyleSheet } from 'react-native';
import theme from '../../../../../lib/colors';

export const chatMsg = StyleSheet.create({
    listContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        marginTop: 5
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
        color: theme.primary.typo.main,
        fontFamily: theme.fontRegular,
        fontSize: 16,
        marginLeft: 10
    },
    message: {
        color: theme.primary.typo.sub,
        fontSize: 14,
        marginTop: 2,
        marginLeft: 10,
        fontFamily: theme.fontRegular
    },
    timestamp: {
        color: '#86939e',
        fontSize: 12,
        marginTop: 1,
        marginLeft: 10,
        fontWeight: 'normal',
        fontFamily: theme.fontRegular
    },
    typingIndicator: {
        fontFamily: theme.fontRegular,
        color: theme.primary.typo.text,
        marginLeft: 20,
        fontSize: 12
    },
    dateDivider: {
        backgroundColor: theme.primary.light
    }
});
