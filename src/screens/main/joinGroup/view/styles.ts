import { StyleSheet } from 'react-native';
import theme from '../../../../lib/colors';

export const viewStyle = StyleSheet.create({
    container: {
        backgroundColor: theme.primary.regular,
        flex: 1,
        paddingTop: 40,
        paddingBottom: 15
    }
});

export const linkForm = StyleSheet.create({
    label: {
        fontFamily: theme.fontRegular,
        color: theme.primary.typo.sub,
        fontSize: 16
    },
    input: {
        fontFamily: theme.fontRegular,
        color: theme.primary.typo.text,
        fontSize: 16
    },
    buttonCont: {
        margin: 10
    },
    button: {
        backgroundColor: theme.secondary.regular
    }
});
