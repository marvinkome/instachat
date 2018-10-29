import { StyleSheet } from 'react-native';
import theme from '../lib/colors';

export const stackStyles = StyleSheet.create({
    header: {
        backgroundColor: theme.primary.regular,
        elevation: 0
    },
    title: {
        flex: 1,
        textAlign: 'left',
        color: theme.primary.typo.main,
        fontSize: 19,
        fontWeight: 'normal',
        fontFamily: theme.fontRegular
    }
});

export const tabStyles = StyleSheet.create({
    background: {
        backgroundColor: theme.primary.regular
    },
    indicator: {
        backgroundColor: theme.secondary.regular,
        height: 3
    },
    label: {
        fontFamily: theme.fontRegular
    }
});
