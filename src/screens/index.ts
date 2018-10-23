import { createStackNavigator } from 'react-navigation';

// screens
import Main from './main';
import Login from './login';

const RootStackNavigator = (initialRouteName: string) => {
    return createStackNavigator({ Main, Login }, { initialRouteName });
};

export default RootStackNavigator;
