import { createStackNavigator } from 'react-navigation';

// home screen
import Home from './home';

// chat screen
import Chat from './chat';

// login screen
import Login from './login';

// create group screen
import NewGroup from './newGroup';

const RootStackNavigator = (initialRouteName: string) => {
    return createStackNavigator(
        {
            Home,
            Chat,
            Login,
            NewGroup
        },
        {
            initialRouteName
        }
    );
};

export default RootStackNavigator;
