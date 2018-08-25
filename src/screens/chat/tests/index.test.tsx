import React from 'react';
import Chats from '../index';
import View from '../view';
import { ChatBody } from '../view/chatBody';
import { ChatForm } from '../view/chatForm';
import { create } from 'react-test-renderer';

describe('chat screen', () => {
    it('renders correctly', () => {
        const comp = create(<Chats />);
        expect(comp.toJSON()).toMatchSnapshot();
    });

    describe('chat view', () => {
        const view = create(<View />);
        const viewIns = view.root;
        it('renders (snapshot)', () => {
            expect(view.toJSON()).toMatchSnapshot();
        });

        // should containing the to - user name
        it('should contain the reciever username and last seen', () => {
            const comp = viewIns.findByProps({
                ['data-testId']: 'chat-header'
            });
            const name = comp.findByProps({ ['data-testID']: 'username' });
            const lastSeen = comp.findByProps({ ['data-testID']: 'last-seen' });

            expect(name.props.children).toBe('Larry Doe');
            expect(lastSeen.props.children).toBe('Last seen: 12/12/17');
        });

        describe('chat body', () => {
            const listItems = [
                {
                    name: 'jamesbond',
                    text: 'Lorem ipsum dolor sit amet consectetur',
                    time: '9 Aug 2018 23:00'
                },
                {
                    name: 'you',
                    text: 'Doing?',
                    time: 'Today at 13:45'
                }
            ];
            it('renders 4 chats', () => {
                const chatItems = create(<ChatBody items={listItems} />);
                expect(chatItems).toMatchSnapshot();
            });

            // should have avatar component only on messages from sender
            // only first message should have avatar image when there's multple messages
            // there should be a new messages indicator
        });

        describe('chat form', () => {
            it('should render correctly', () => {
                const comp = create(<ChatForm />);
                expect(comp).toMatchSnapshot();
            });
        });
    });
});
