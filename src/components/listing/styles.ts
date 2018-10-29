import { StyleSheet } from 'react-native';
import theme from '../../lib/colors';

export const ViewStyles = StyleSheet.create({
    listItemContainer: {
        borderBottomWidth: 0,
        paddingLeft: 5,
        paddingBottom: 15,
        paddingTop: 15
    },
    name: {
        color: theme.primary.typo.main,
        fontFamily: theme.fontRegular,
        fontSize: 16
    },
    message: {
        color: theme.primary.typo.sub,
        fontFamily: theme.fontRegular,
        fontWeight: 'normal',
        fontSize: 14
    },
    rightContainer: {
        paddingLeft: 15
    },
    time: {
        fontSize: 13,
        fontFamily: theme.fontRegular,
        alignSelf: 'flex-end',
        marginRight: 10,
        paddingBottom: 4,
        color: theme.primary.typo.text
    },
    badgeContainer: {
        backgroundColor: theme.secondary.regular,
        alignSelf: 'flex-end',
        padding: 7,
        marginRight: 15
    },
    badgeText: {
        color: theme.secondary.typo.main,
        fontSize: 13,
        fontFamily: theme.fontRegular,
        alignSelf: 'center'
    }
});
