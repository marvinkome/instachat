import { createStackNavigator } from 'react-navigation';
import Main from './main';

// login screen
import Login from './login';

const RootStackNavigator = (initialRouteName: string) => {
    return createStackNavigator({ Main, Login }, { initialRouteName });
};

export default RootStackNavigator;
