import { StyleSheet } from 'react-native';
import color from '../../../lib/colors';

export const viewStyle = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 20,
        paddingBottom: 15
    }
});

export const imgForm = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    text: {
        fontFamily: 'PT_Sans',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: color.text_light
    }
});

export const groupForm = StyleSheet.create({
    label: {
        fontFamily: 'PT_Sans',
        fontSize: 16
    },
    input: {
        fontFamily: 'PT_Sans',
        fontSize: 16
    },
    buttonCont: {
        margin: 10
    },
    button: {
        backgroundColor: color.primary
    }
});
