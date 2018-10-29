import { StyleSheet } from 'react-native';
import theme from '../../lib/colors';

export const modalView = StyleSheet.create({
    modalContainer: {
        flex: 1
    },
    container: {
        backgroundColor: theme.primary.regular,
        paddingTop: '10%',
        paddingBottom: '10%',
        borderRadius: 5
    },
    text: {
        fontSize: 17,
        fontFamily: theme.fontRegular,
        color: theme.primary.typo.sub,
        textAlign: 'center'
    },
    link: {
        marginTop: 25,
        borderWidth: 2,
        borderColor: '#0002',
        borderRadius: 5,
        marginBottom: 5,
        fontFamily: theme.fontRegular,
        color: theme.primary.regular,
        backgroundColor: theme.primary.typo.main,
        fontSize: 15,
        margin: 14,
        padding: 10
    },
    button: {
        backgroundColor: theme.secondary.regular
    },
    cta: {
        marginTop: 10,
        fontSize: 16,
        fontFamily: theme.fontRegular,
        color: theme.secondary.typo.main,
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
});
