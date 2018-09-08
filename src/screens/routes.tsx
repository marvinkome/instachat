import { createStackNavigator } from 'react-navigation';

// home screen
import Home from './home';

// chat screen
import Chat from './chat';

// login screen
import Login from './login';

// create group screen
import NewGroup from './newGroup';
import JoinGroup from './joinGroup';

const RootStackNavigator = (initialRouteName: string) => {
    return createStackNavigator(
        {
            Home,
            Chat,
            Login,
            NewGroup,
            JoinGroup
        },
        {
            initialRouteName
        }
    );
};

export default RootStackNavigator;
