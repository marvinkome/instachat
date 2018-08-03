import * as React from 'react';
import { Content } from 'native-base';
import { ChatCard } from './chatCard';
import { ChatForm } from './chatForm';

const ChatView = () => {
    const listItems = [
        {
            name: 'James Bond',
            text:
                'Lorem ipsum dolor sit amet consectetur,\
                adipisicing elit. Facere, ad minima voluptas \
                temporibus voluptatem sequi autem expedita obcaecati \
                voluptates, mollitia nemo doloribus quae laboriosam \
                dolores eos fuga quam accusantium esse.',
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
            <Content style={{ backgroundColor: '#9a9a9a' }}>
                {listItems.map((item, index) => (
                    <ChatCard item={item} key={index} />
                ))}
            </Content>
            <ChatForm />
        </React.Fragment>
    );
};

export default ChatView;
