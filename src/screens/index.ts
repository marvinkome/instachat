import { createSwitchNavigator } from 'react-navigation';

// screens
import Main from './main';
import Login from './login';
import Logout from './logout';
import AuthLoader from './authLoader';

export default createSwitchNavigator(
    {
        AuthLoader,
        Main,
        Login,
        Logout
    },
    { initialRouteName: 'AuthLoader' }
);
