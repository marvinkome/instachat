import React from 'react';
import { shallow } from 'enzyme';
import App from '../index';

describe('app unit tests', () => {
    const app = shallow(<App />);

    it('renders correctly with defaults', () => {
        expect(app).toMatchSnapshot();
    });
});
