import React from 'react';
import { shallow } from 'enzyme';

import MainScreen from '../index';

describe('main screen tests', () => {
    it('header should with 3 tabs', () => {
        const app = shallow(<MainScreen />);
        expect(app).toMatchSnapshot();
    });
});
