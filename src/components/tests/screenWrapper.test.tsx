import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

import ScreenWrapper from '../screenWrapper';

describe('screen wrapper tests', () => {
    it('renders correctly with defaults', () => {
        const app = renderer
            .create(
                <ScreenWrapper
                    render={() => <Text>Hello</Text>}
                    screenHeader="Tests"
                />
            )
            .toJSON();
        expect(app).toMatchSnapshot();
    });
});
