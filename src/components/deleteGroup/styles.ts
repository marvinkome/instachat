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
    btnsCont: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnCont: {
        width: '40%'
    },
    btnText: {
        fontFamily: theme.fontRegular,
        color: theme.primary.typo.sub
    },
    btnYes: {
        borderRadius: 7,
        borderWidth: 1,
        borderColor: theme.error.bg
    },
    button: {
        backgroundColor: 'transparent'
    }
});
