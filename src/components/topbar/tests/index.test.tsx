import React from 'react';
import renderer from 'react-test-renderer';

import Topbar from '../index';

describe('topbar tests', () => {
    it('renders correctly with defaults', () => {
        const app = renderer.create(<Topbar headerText="Tests" />).toJSON();
        expect(app).toMatchSnapshot();
    });
});
