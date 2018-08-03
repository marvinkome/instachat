import React from 'react';
import { shallow } from 'enzyme';

import App from '../index';

describe('app unit tests', () => {
    it('renders correctly with defaults', () => {
        const app = shallow(<App />);
        expect(app).toMatchSnapshot();
    });
});
