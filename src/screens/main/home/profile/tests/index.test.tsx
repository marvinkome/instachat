import * as React from 'react';
import { create } from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import { Profile } from '../index';
import View from '../view';
import query from '../view/gql';

const mocks = [
    {
        request: {
            query
        },
        result: {
            data: {
                user: {
                    id: '1',
                    username: 'johndoe',
                    about: 'Hey there'
                }
            }
        }
    }
];

describe('<Profile/>', () => {
    it('renders correctly', () => {
        const comp = create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Profile />
            </MockedProvider>
        );
        expect(comp.toJSON()).toMatchSnapshot();
    });

    // it should show user avatar, display name and status
    it('should show user avatar, display name and status', async () => {
        const comp = create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <View />
            </MockedProvider>
        );
        await wait(0);
        const wrapper = comp.root;
        const userDataView = wrapper.findByProps({
            ['data-testId']: 'user-data-view'
        });

        // assert it renders an avatar component
        const avatarComponent = userDataView.findAllByProps({ rounded: true });
        expect(avatarComponent).toBeTruthy();

        // asser it displays user name
        const texts = userDataView.findAllByType('Text');
        const name = texts[0].children[0];

        expect(name).toBe('johndoe');

        // assert it displays status
        const status = texts[1].children[0];
        expect(status).toBe('Hey there');
    });

    // it should have edit profile when image is clicked

    it('should render settings items', async () => {
        const comp = create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <View />
            </MockedProvider>
        );
        await wait(0);

        const wrapper = comp.root;
        const settingsComp = wrapper.findByProps({ ['data-testId']: 'list' });

        // should have 4 children
        const listItem = settingsComp.findAll((node) => node.props.hideChevron);
        expect(listItem).toHaveLength(5);

        // list 4 options
        // array of children text
        const titleLists = listItem.map((item) => item.props.title);
        expect(titleLists).toEqual([
            'Invite Friends',
            'FAQ',
            'Help',
            'About',
            'Logout'
        ]);
    });
});
