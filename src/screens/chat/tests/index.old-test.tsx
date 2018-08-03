import React from 'react';
import renderer from 'react-test-renderer';

import ChatScreen from '../index';
import View from '../view';
import { ChatCard } from '../view/chatCard';
import { ChatForm } from '../view/chatForm';

describe('chat screen tests', () => {
    it('renders correctly with defaults', () => {
        const app = renderer.create(<ChatScreen />).toJSON();
        expect(app).toMatchSnapshot();
    });

    it('renders view correctly with defaults', () => {
        const app = renderer.create(<View />).toJSON();
        expect(app).toMatchSnapshot();
    });

    it('renders chat card correctly', () => {
        const app = renderer
            .create(
                <ChatCard item={{ name: 'John', text: 'hello', time: 'now' }} />
            )
            .toJSON();
        expect(app).toMatchSnapshot();
    });

    it('renders chat form correctly with defaults', () => {
        const app = renderer.create(<ChatForm />).toJSON();
        expect(app).toMatchSnapshot();
    });
});
