import * as React from 'react';
import wait from 'waait';
import { MockedProvider, MockedResponse } from 'react-apollo/test-utils';

import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';

import { Chats } from '../index';
import query from '../gql';

// mock react navigation
jest.mock('react-navigation');

// snapshot
it('<Chats/> shallow renders correctly <snapshot>', () => {
    const app = shallow(<Chats />);

    expect(app).toMatchSnapshot();
});

describe('<Chats/> integration tests', () => {
    const setupComp = (withError?: boolean) => {
        let mockRes: MockedResponse = {
            request: { query },
            result: {
                data: {
                    user: {
                        id: 0,
                        groups: [
                            {
                                id: 1,
                                name: 'Fake Group',
                                messages: [
                                    {
                                        id: 2,
                                        message: 'Fake message',
                                        timestamp: 1234567
                                    }
                                ],
                                role: {
                                    name: 'user'
                                }
                            }
                        ]
                    }
                }
            }
        };

        if (withError) {
            mockRes = {
                ...mockRes,
                error: new Error('aw error, sucks')
            };
        }

        return create(
            <MockedProvider mocks={[mockRes]} addTypename={false}>
                <Chats />
            </MockedProvider>
        );
    };

    // full integration testing
    it('lists all chats', async () => {
        const comp = setupComp();
        await wait(0);

        // find lists
        const list = comp.root.findByProps({ 'data-testid': 'chat-list' });
        expect(list).toBeTruthy();
    });
});
