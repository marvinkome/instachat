import React from 'react';
import renderer from 'react-test-renderer';

import Lists from '../lists';

describe('Lists tests', () => {
    it('renders correctly with defaults', () => {
        const app = renderer.create(<Lists renderItems={[]} />).toJSON();
        expect(app).toMatchSnapshot();
    });
});
