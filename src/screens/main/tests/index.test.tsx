import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

import MainScreen from '../index';
import View from '../view';

describe('main screen tests', () => {
    it('renders correctly with defaults', () => {
        const app = renderer.create(<MainScreen />).toJSON();
        expect(app).toMatchSnapshot();
    });

    it('renders view correctly with defaults', () => {
        const app = renderer.create(<View />).toJSON();
        expect(app).toMatchSnapshot();
    });
});
