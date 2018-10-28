import { createSwitchNavigator } from 'react-navigation';

// screens
import Main from './main';
import Login from './login';
import AuthLoader from './authLoader';

export default createSwitchNavigator(
    {
        AuthLoader,
        Main,
        Login
    },
    { initialRouteName: 'AuthLoader' }
);
