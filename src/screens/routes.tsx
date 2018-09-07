import { createStackNavigator } from 'react-navigation';

// home screen
import Home from './home';

// chat screen
import Chat from './chat';

// login screen
import Login from './login';

const RootStackNavigator = (initialRouteName: string) => {
    return createStackNavigator(
        {
            Home,
            Chat,
            Login
        },
        {
            initialRouteName
        }
    );
};

export default RootStackNavigator;
