import { StyleSheet } from 'react-native';

export const stackStyles = StyleSheet.create({
    header: {
        backgroundColor: '#fff'
    },
    title: {
        flex: 1,
        textAlign: 'center',
        color: 'hsl(0, 0%, 20%)',
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
        backgroundColor: '#42ED86'
    },
    label: {
        fontFamily: 'Karla',
        fontSize: 16
    }
});
