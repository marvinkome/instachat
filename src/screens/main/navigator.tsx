import { createStackNavigator } from 'react-navigation';
import theme from '../../lib/colors';

// routes
import Home from './home';
import Chat from './chat';
import NewGroup from './newGroup';
import JoinGroup from './joinGroup';
import EditProfile from './editProfile';

export default createStackNavigator(
    {
        Home,
        Chat,
        NewGroup,
        JoinGroup,
        EditProfile
    },
    {
        initialRouteName: 'Home',
        cardStyle: { backgroundColor: theme.primary.regular }
    }
);
