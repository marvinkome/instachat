import { StyleSheet } from 'react-native';
import colors from '../../../lib/colors';

export const viewStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.primary.regular
    },
    logoText: {
        fontFamily: 'Karla',
        fontSize: 17,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 25,
        alignSelf: 'center'
    },
    bottomText: {
        fontFamily: 'PT_Sans',
        color: 'hsl(0, 0%, 90%)',
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 10
    },
    bottomCta: {
        textDecorationLine: 'underline',
        color: 'hsl(0, 0%, 20%)'
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
        padding: 5
    },
    icon: {
        color: colors.text_light
    },
    btnCont: {
        marginLeft: 25,
        marginRight: 25,
        elevation: 5
    },
    btnText: {}
});
