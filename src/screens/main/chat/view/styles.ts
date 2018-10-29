import { StyleSheet } from 'react-native';
import theme from '../../../../lib/colors';

export const viewStyles = StyleSheet.create({
    container: {
        backgroundColor: theme.primary.regular,
        flex: 1
    }
});

export const chatHeaderStyles = StyleSheet.create({
    container: {
        backgroundColor: theme.primary.regular,
        elevation: 4,
        borderBottomWidth: 0
    },
    leftCont: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        fontSize: 37,
        color: theme.primary.typo.main,
        padding: 10,
        borderRadius: 5
    },
    rightIcon: {
        fontSize: 17,
        color: theme.primary.typo.main,
        paddingBottom: 15
    },
    title: {
        fontSize: 19,
        fontFamily: theme.fontRegular,
        paddingBottom: 14,
        paddingLeft: 15,
        color: theme.primary.typo.main
    },
    menuOptions: {
        paddingTop: 5,
        paddingBottom: 5
    },
    menuText: {
        fontFamily: 'PT_Sans',
        fontSize: 15,
        padding: 7,
        color: theme.text_title
    }
});

export const chatFormStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 45
    },
    formContainer: {
        flex: 4,
        backgroundColor: theme.primary.regular,
        padding: 0,
        margin: 0
    },
    input: {
        color: theme.primary.typo.main,
        height: 45,
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
        padding: 9,
        paddingLeft: 7,
        backgroundColor: theme.primary.regular
    },
    btnDisabled: {
        backgroundColor: theme.primary.regular
    },
    btnText: {
        display: 'none'
    },
    offlineBtn: {
        opacity: 0.5
    },
    offlineInput: {
        color: 'yellow',
        opacity: 0.5
    }
});
