import { AppRegistry } from 'react-native';
import App from './src/index';
import bgMessaging from './src/bgMessaging';

AppRegistry.registerComponent('ChatApp', () => App);
// New task registration
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
