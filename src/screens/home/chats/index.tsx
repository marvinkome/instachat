import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Chats = () => {
    const style = StyleSheet.create({
        text: { fontFamily: 'Karla', fontSize: 24 }
    });
    return (
        <View>
            <Text style={style.text}>Hello Chatsqg</Text>
        </View>
    );
};
