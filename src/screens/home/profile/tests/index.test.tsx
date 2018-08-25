import * as React from 'react';
import { create } from 'react-test-renderer';
import { Profile } from '../index';
import View from '../view';

describe('<Profile/>', () => {
    it('renders correctly', () => {
        const comp = create(<Profile />);
        expect(comp.toJSON()).toMatchSnapshot();
    });

    const wrapper = create(<View />).root;

    // it should show user avatar, display name and status
    it('should show user avatar, display name and status', () => {
        const userDataView = wrapper.findByProps({
            ['data-testId']: 'user-data-view'
        });

        // assert it renders an avatar component
        const avatarComponent = userDataView.findAllByProps({ rounded: true });
        expect(avatarComponent).toBeTruthy();

        // asser it displays user name
        const texts = userDataView.findAllByType('Text');
        const name = texts[0].children[0];

        expect(name).toBe('John Doe');

        // assert it displays status
        const status = texts[1].children[0];
        expect(status).toBe(
            'Ive been trying to reach you all day and youre not picking up, is everything all right?'
        );
    });

    // it should have edit profile when image is clicked

    it('should render settings items', () => {
        const settingsComp = wrapper.findByProps({ ['data-testId']: 'list' });

        // should have 4 children
        const listItem = settingsComp.findAll((node) => node.props.hideChevron);
        expect(listItem).toHaveLength(4);

        // list 4 options
        // array of children text
        const titleLists = listItem.map((item) => item.props.title);
        expect(titleLists).toEqual(['Invite Friends', 'FAQ', 'Help', 'About']);
    });
});
