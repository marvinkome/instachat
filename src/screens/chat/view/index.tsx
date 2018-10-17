import * as React from 'react';
import { View } from 'react-native';

import ChatHeader from './chatHeader';
import ChatBody from './chatBody';
import ChatForm from './chatForm';

import { viewStyles as styles } from './styles';

export const PageView = () => {
    return (
        <View style={styles.container}>
            <ChatHeader data-testId="chat-header" />
            <ChatBody data-testId="chat-body" />
            <ChatForm />
        </View>
    );
};

export default PageView;
