import * as React from 'react';
import { create } from 'react-test-renderer';
import App from '../index';
import { flushPromises } from '../../lib/tests';

describe('screen tests', () => {
    const comp = create(<App />);
    flushPromises();

    it('renders correctly, <snapshot>', () => {
        expect(comp.toJSON()).toMatchSnapshot();
    });
});
