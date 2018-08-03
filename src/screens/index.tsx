import * as React from 'react';
import { createStackNavigator } from 'react-navigation';

import AllChats from './main';
import Chats from './chat';
import Login from './login';
import { Container } from 'native-base';

const Navigator = createStackNavigator(
    {
        Home: AllChats,
        Chat: Chats,
        Login: Login
    },
    {
        cardStyle: { backgroundColor: '#fafafa' }
    }
);

const Screens = () => (
    <Container>
        <Navigator />
    </Container>
);

export default Screens;
