import { StyleSheet } from 'react-native';
import colors from '../../../lib/colors';

export const viewStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    }
});

export const chatHeaderStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    icon: {
        fontSize: 37,
        color: colors.primary,
        padding: 10,
        borderRadius: 50
    },
    rightIcon: {
        fontSize: 17,
        color: colors.primary,
        paddingBottom: 15
    },
    title: {
        fontSize: 19,
        fontFamily: 'PT_Sans',
        paddingBottom: 14,
        color: colors.text_title,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Karla',
        textAlign: 'center',
        color: colors.text_light
    },
    menuOptions: {
        paddingTop: 5,
        paddingBottom: 5
    },
    menuText: {
        fontFamily: 'PT_Sans',
        fontSize: 15,
        padding: 7,
        color: colors.text_title
    }
});

export const chatFormStyles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    formContainer: {
        flex: 4,
        backgroundColor: '#fff',
        padding: 0,
        margin: 0
    },
    input: {
        height: 65,
        width: '100%'
    },
    btnCont: {
        flex: 1
    },
    btn: {
        marginLeft: 0,
        marginRight: 0
    },
    btnStyle: {
        paddingLeft: 7,
        backgroundColor: colors.primary
    },
    btnText: {
        display: 'none'
    }
});
