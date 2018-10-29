import { StyleSheet } from 'react-native';
import theme from '../../../lib/colors';

export const stackStyles = StyleSheet.create({
    header: {
        backgroundColor: theme.primary.regular
    },
    title: {
        flex: 1,
        color: theme.primary.typo.main,
        fontSize: 19,
        fontWeight: 'normal',
        fontFamily: theme.fontRegular
    }
});
