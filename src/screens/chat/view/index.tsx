import * as React from 'react';
import { View } from 'react-native';
import { ChatHeader } from './chatHeader';
import { ChatBody } from './chatBody';
import { ChatForm } from './chatForm';
import { viewStyles as styles } from './styles';

const ChatView = () => {
    const listItems = [
        {
            name: 'jamesbond',
            text:
                'Lorem ipsum dolor sit amet consectetur,  adipisicing elit. Facere, ad minima voluptas.',
            time: '9 Aug 2018 23:00'
        },
        {
            name: 'jamesbond',
            text: 'Lorem ipsum dolor sit amet consectetur',
            time: '9 Aug 2018 23:00'
        },
        {
            name: 'you',
            text: 'Doing?',
            time: 'Today at 13:45'
        },
        {
            name: 'you',
            text: 'Lorem ipsum dolor sit amet consectetur',
            time: 'Today at 13:45'
        }
    ];

    return (
        <View style={styles.container}>
            <ChatHeader data-testId="chat-header" />
            <ChatBody data-testId="chat-body" items={listItems} />
            <ChatForm />
        </View>
    );
};

export default ChatView;
