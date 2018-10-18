import { StyleSheet } from 'react-native';
import colors from '../../../../lib/colors';

export const ViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    listContainer: {
        marginTop: 13,
        borderTopWidth: 0
    }
});

export const UserDataStyles = StyleSheet.create({
    container: {
        backgroundColor: 'hsl(0, 0%, 99%)',
        paddingTop: 15,
        paddingBottom: 15,
        padding: 20,
        flexDirection: 'row'
    },
    innerContainer: {
        justifyContent: 'center'
    },
    name: {
        fontFamily: 'Karla',
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.text_title
    },
    about: {
        fontFamily: 'Karla',
        fontSize: 14,
        paddingTop: 7
    }
});

export const UserSettingsStyles = StyleSheet.create({
    list: {
        borderTopWidth: 0
    },
    listItem: {
        borderBottomColor: 'hsl(0, 0%, 90%)',
        paddingTop: 15,
        paddingBottom: 15
    },
    title: {
        fontFamily: 'Karla',
        color: colors.text_light,
        fontSize: 15
    }
});
