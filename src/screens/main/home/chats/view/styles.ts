import { StyleSheet } from 'react-native';
import theme from '../../../../../lib/colors';

export const ViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.primary.regular
    },
    listContainer: {
        marginTop: 13,
        borderTopWidth: 0,
        backgroundColor: 'transparent'
    },
    emptyView: {
        flex: 1,
        paddingTop: '15%',
        alignItems: 'center'
    },
    emptyText: {
        fontFamily: theme.fontRegular,
        textAlign: 'center',
        margin: 15
    }
});
