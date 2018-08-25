import { StyleSheet } from 'react-native';
import color from '../lib/colors';

export const stackStyles = StyleSheet.create({
    header: {
        backgroundColor: '#fff'
    },
    title: {
        flex: 1,
        textAlign: 'center',
        color: color.text_title,
        fontSize: 19,
        fontWeight: 'normal',
        fontFamily: 'Karla'
    }
});

export const tabStyles = StyleSheet.create({
    background: {
        backgroundColor: '#fff'
    },
    indicator: {
        backgroundColor: color.primary
    },
    label: {
        fontFamily: 'Karla'
    }
});
