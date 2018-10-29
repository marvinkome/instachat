import { StyleSheet } from 'react-native';
import theme from '../../../../../lib/colors';

export const ViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.primary.regular
    },
    listContainer: {
        marginTop: 13,
        borderTopWidth: 0
    }
});

export const UserDataStyles = StyleSheet.create({
    container: {
        backgroundColor: theme.primary.dark,
        paddingTop: 15,
        paddingBottom: 15,
        padding: 20,
        flexDirection: 'row'
    },
    innerContainer: {
        justifyContent: 'center'
    },
    name: {
        fontFamily: theme.fontRegular,
        fontSize: 17,
        fontWeight: 'bold',
        color: theme.primary.typo.main
    },
    about: {
        fontFamily: theme.fontRegular,
        fontSize: 14,
        paddingTop: 7,
        color: theme.primary.typo.main
    }
});

export const UserSettingsStyles = StyleSheet.create({
    list: {
        borderTopWidth: 0,
        backgroundColor: 'transparent'
    },
    listItem: {
        borderBottomColor: theme.primary.light,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 10,
        marginRight: 10
    },
    title: {
        fontFamily: theme.fontRegular,
        color: theme.primary.typo.sub,
        fontSize: 15
    }
});
