import React from 'react';
import renderer from 'react-test-renderer';

import Topbar from '../index';
import { Title } from 'native-base';

describe('topbar tests', () => {
    it('renders correctly with defaults', () => {
        const app = renderer
            .create(<Topbar renderBody={<Title>Hello Tests</Title>} />)
            .toJSON();
        expect(app).toMatchSnapshot();
    });
});
