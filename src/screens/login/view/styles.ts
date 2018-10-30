import { StyleSheet } from 'react-native';
import theme from '../../../lib/colors';

export const viewStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.primary.regular
    },
    logoText: {
        fontFamily: theme.fontCursive,
        fontSize: 19,
        color: theme.primary.typo.main,
        fontWeight: 'bold',
        marginBottom: 25,
        alignSelf: 'center'
    },
    bottomText: {
        fontFamily: theme.fontRegular,
        color: theme.primary.typo.sub,
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 10
    },
    bottomCta: {
        textDecorationLine: 'underline',
        color: theme.secondary.light
    }
});

export const formStyles = StyleSheet.create({
    container: {
        marginLeft: 15,
        marginRight: 15
    },
    formCont: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 4
    },
    iconCont: {
        padding: 5,
        paddingLeft: 7
    },
    icon: {
        fontSize: 20,
        color: theme.primary.dark
    },
    input: {
        fontWeight: 'normal',
        fontFamily: theme.fontRegular,
        color: theme.primary.light
    },
    btnCont: {
        marginLeft: 25,
        marginRight: 25
    },
    btn: {
        elevation: 5,
        backgroundColor: theme.secondary.regular
    },
    btnText: {
        color: theme.secondary.typo.main
    }
});
