import { StyleSheet } from 'react-native';
import color from '../../../lib/colors';

export const stackStyles = StyleSheet.create({
    header: {
        backgroundColor: color.primary
    },
    title: {
        flex: 1,
        color: '#fff',
        fontSize: 19,
        fontWeight: 'normal',
        fontFamily: 'Karla'
    }
});
