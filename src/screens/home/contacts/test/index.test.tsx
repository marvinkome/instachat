import * as React from 'react';
import { create } from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import { Contacts } from '../index';
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
                    groups: {
                        edges: [
                            {
                                node: {
                                    id: '12',
                                    uuid: '1',
                                    name: 'Test group',
                                    topic: null
                                }
                            }
                        ]
                    }
                }
            }
        }
    }
];

describe('<Contacts/> listing tab', () => {
    // snapshot
    // it('renders correctly', () => {
    //     const app = create(
    //         <MockedProvider mocks={mocks} addTypename={false}>
    //             <Contacts />
    //         </MockedProvider>
    //     );

    //     expect(app).toMatchSnapshot();
    // });

    // list all chats
    it('should list all chats', async () => {
        const comp = create(
            <MockedProvider mocks={mocks} addTypename={false}>
                //@ts-ignore
                <View />
            </MockedProvider>
        );
        await wait(0);

        const wrapper = comp.root;
        const list = wrapper.findByProps({ 'data-testId': 'list' });
        // expect(list).toMatchSnapshot();
        expect(list.children).toHaveLength(1);

        // const listing = list.children[0];
        // expect(listing).toMatchSnapshot();
    });
});
