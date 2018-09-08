import { StyleSheet } from 'react-native';

export const ViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    listContainer: {
        marginTop: 13,
        borderTopWidth: 0
    },
    emptyView: {
        flex: 1,
        paddingTop: '15%',
        alignItems: 'center'
    },
    emptyText: {
        fontFamily: 'PT_Sans',
        textAlign: 'center',
        margin: 15
    }
});
