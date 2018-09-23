import React from 'react';
const withNavigation = jest.fn().mockImplementation((Comp) => () => <Comp />);

module.exports = {
    ...jest.genMockFromModule('react-navigation'),
    withNavigation
};
