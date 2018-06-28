import React from 'react';
import renderer from 'react-test-renderer';

import App from '../index';

describe('app tests', () => {
    it('renders correctly with defaults', () => {
        const app = renderer.create(<App />).toJSON();
        expect(app).toMatchSnapshot();
    });
});
