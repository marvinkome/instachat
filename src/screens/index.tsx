import * as React from 'react';
import { createStackNavigator } from 'react-navigation';

import AllChats from './main';
import Chats from './chat';
import { Container } from 'native-base';

const Navigator = createStackNavigator(
    {
        Home: AllChats,
        Chat: Chats
    },
    {
        initialRouteName: 'Home',
        cardStyle: { backgroundColor: '#fafafa' }
    }
);

const Screens = () => (
    <Container style={{ backgroundColor: '#fefefe' }}>
        <Navigator />
    </Container>
);

export default Screens;
