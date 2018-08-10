import { StyleSheet } from 'react-native';
import color from '../../lib/colors';

export const ViewStyles = StyleSheet.create({
    listItemContainer: {
        borderBottomWidth: 0,
        paddingLeft: 5,
        paddingBottom: 30
    },
    name: {
        fontFamily: 'Karla',
        fontSize: 16,
        fontWeight: '700'
    },
    message: {
        fontFamily: 'Karla',
        fontSize: 14
    },
    rightContainer: {
        paddingLeft: 15
    },
    time: {
        fontSize: 13,
        fontFamily: 'Karla',
        alignSelf: 'flex-end',
        marginRight: 10,
        paddingBottom: 4,
        color: color.text_light
    },
    badgeContainer: {
        backgroundColor: color.primary,
        alignSelf: 'flex-end',
        padding: 7,
        marginRight: 15
    },
    badgeText: {
        color: '#fff',
        fontSize: 13,
        fontFamily: 'Karla',
        alignSelf: 'center'
    }
});
