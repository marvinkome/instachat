import { StyleSheet } from 'react-native';

export const chatCardStyles = StyleSheet.create({
    card: {
        alignSelf: 'flex-start',
        maxWidth: '75%',
        marginLeft: 7,
        marginRight: 7
    },
    cardItemHeader: {
        paddingTop: 4,
        paddingBottom: 0,
        paddingLeft: 10
    },
    cardItemTime: {
        paddingTop: 0,
        paddingBottom: 4,
        paddingLeft: 10,
        alignItems: 'flex-end'
    },
    cardItemBody: {
        paddingLeft: 10,
        alignSelf: 'flex-start'
    },
    time: {
        textAlign: 'right'
    }
});

export const chatFormStyles = StyleSheet.create({
    textArea: {
        flex: 4,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: undefined
    },
    footerTab: {
        marginTop: 12,
        marginBottom: 12,
        marginLeft: 7,
        marginRight: 7,
        borderRadius: 20,
        paddingLeft: 7,
        paddingRight: 7,
        backgroundColor: 'white'
    },
    footer: {
        backgroundColor: 'transparent',
        height: 65
    },
    button: {
        flex: 1,
        height: 50
    }
});
