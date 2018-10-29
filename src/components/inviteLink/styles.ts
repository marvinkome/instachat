import { StyleSheet } from 'react-native';
import color from '../../lib/colors';

export const modalView = StyleSheet.create({
    modalContainer: {
        flex: 1
    },
    container: {
        backgroundColor: '#fff',
        paddingTop: '10%',
        paddingBottom: '10%',
        borderRadius: 5
    },
    text: {
        fontSize: 20,
        fontFamily: 'PT_Sans',
        color: color.text_light,
        textAlign: 'center'
    },
    link: {
        marginTop: 25,
        borderWidth: 2,
        borderColor: '#0002',
        borderRadius: 3,
        marginBottom: 5,
        fontFamily: 'PT_Sans',
        fontSize: 18,
        margin: 10,
        padding: 10
    },
    button: {
        backgroundColor: color.primary.regular
    },
    cta: {
        marginTop: 10,
        fontSize: 16,
        fontFamily: 'PT_Sans',
        color: color.text_light,
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
});
