import { StyleSheet } from 'react-native';
import colors from '../../../lib/colors';

export const viewStyles = StyleSheet.create({
    container: {
        backgroundColor: 'hsl(0, 0%, 96%)',
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

export const chatBodyStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    chatContainer: {
        marginBottom: 15,
        width: '80%'
    },
    item: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        padding: 10
    },
    sender: {
        color: '#fff',
        marginRight: 7,
        fontSize: 16,
        fontWeight: '600'
    },
    footer: {
        marginTop: 5
    },
    name: {
        color: '#fff',
        fontSize: 12,
        opacity: 0.8,
        marginBottom: 7
    },
    time: {
        color: '#fff',
        fontSize: 12,
        opacity: 0.8,
        marginTop: 7
    },
    text: {
        color: '#fff',
        fontFamily: 'PT_Sans',
        fontSize: 16,
        letterSpacing: -0.25
    },
    newMsg: {
        alignItems: 'center'
    },
    newMsgText: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        margin: 15,
        marginTop: 0,
        padding: 7,
        color: '#fff',
        fontFamily: 'PT_Sans',
        elevation: 5
    }
});

export const chatBodyExtra = StyleSheet.create({
    chatContainerElse: {
        flexDirection: 'row'
    },
    itemElse: {
        marginLeft: 13,
        borderTopLeftRadius: 0
    },
    chatContainerMe: {
        flexDirection: 'row-reverse',
        alignSelf: 'flex-end'
    },
    itemMe: {
        marginRight: 13,
        borderTopRightRadius: 0
    },
    withNextCont: {
        marginBottom: 5
    },
    withNextItemElse: {
        borderBottomLeftRadius: 0
    },
    withNextItemMe: {
        borderBottomRightRadius: 0
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
