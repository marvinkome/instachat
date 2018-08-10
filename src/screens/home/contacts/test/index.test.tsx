import * as React from 'react';
import { shallow } from 'enzyme';
import { Contacts } from '../index';
import View from '../view';

describe('<Contacts/> listing tab', () => {
    const lists = [
        {
            name: 'Larry John',
            about: 'I am mocked person :)',
            image: ''
        }
    ];

    // snapshot
    it('renders correctly', () => {
        const app = shallow(<Contacts />);

        expect(app).toMatchSnapshot();
    });

    // list all chats
    it('should list all chats', () => {
        const wrapper = shallow(<View />);
        const list = wrapper.find('List');

        expect(list).toMatchSnapshot();
        expect(list.props().children).toHaveLength(2);
    });
});
