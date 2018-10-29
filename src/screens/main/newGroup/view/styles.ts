import { StyleSheet } from 'react-native';
import theme from '../../../../lib/colors';

export const viewStyle = StyleSheet.create({
    container: {
        backgroundColor: theme.primary.regular,
        flex: 1,
        paddingTop: 20,
        paddingBottom: 15
    },
    avatar: {
        alignItems: 'center',
        paddingBottom: 25
    }
});

export const groupForm = StyleSheet.create({
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
