import * as React from 'react';
import { Content } from 'native-base';
import { ChatCard } from './chatCard';
import { ChatForm } from './chatForm';

const ChatView = () => {
    const listItems = [
        {
            name: 'James Bond',
            text: 'Doing what you like..',
            time: '27/06/2018'
        },
        {
            name: 'you',
            text: 'Doing?',
            time: '13:45'
        },
        {
            name: 'Gary Collen',
            text: 'Hello',
            time: '13:57'
        },
        {
            name: 'James Bond',
            text: 'yeah',
            time: '14:17'
        }
    ];

    return (
        <React.Fragment>
            <Content>
                {listItems.map((item, index) => (
                    <ChatCard item={item} key={index} />
                ))}
            </Content>
            <ChatForm />
        </React.Fragment>
    );
};

export default ChatView;
