import * as React from 'react';
import { shallow } from 'enzyme';
import { Chats } from '../index';
import View from '../view';
import ListItem from '../view/listing';

describe('<Chat/> listing tab', () => {
    const lists = [
        {
            name: 'Larry John',
            text: 'I am mocked :)',
            image: '',
            timestamp: '12:47 AM'
        }
    ];

    // snapshot
    it('renders correctly', () => {
        const app = shallow(<Chats />);

        expect(app).toMatchSnapshot();
    });

    // list all chats
    it('should list all chats', () => {
        const wrapper = shallow(<View lists={lists} />);
        const list = wrapper.find('List');

        expect(list).toMatchSnapshot();
        expect(list.props().children).toHaveLength(1);
    });

    describe('<ListItem/>', () => {
        // a list item should show the number of unread post
        it('shows the number of unread messages', () => {
            const wrapper = shallow(
                <ListItem listItem={lists[0]} typing={false} />
            );
            const badgeProp: { element: any } = wrapper.shallow().prop('badge');

            expect(badgeProp.element).toMatchSnapshot();
            expect(badgeProp.element.props.children[1].props.value).toBe(3);
        });

        // when user is typing change the text
        it('should show typing message when some user is typing', () => {
            const wrapper = shallow(
                <ListItem listItem={lists[0]} typing={true} />
            );
            const text = wrapper.shallow().prop('subtitle');

            expect(text).toBe('typing...');
        });

        // show number of notifications in tab header
        // pressing a list item should go to the chat page
    });
});
