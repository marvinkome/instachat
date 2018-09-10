import * as React from 'react';
import { View, Text } from 'react-native';
import { ViewStyles as styles } from '../styles';

export function EmptyList() {
    return (
        <View style={styles.emptyView}>
            <Text style={styles.emptyText}>
                No chats available. Click the button below to start a group chat
            </Text>
        </View>
    );
}
