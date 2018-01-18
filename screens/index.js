import { Navigation } from 'react-native-navigation';

import Account from './Account';
import Login from './Login';
import Signup from './Signup';

// register all screens of the app (including internal ones)
export function registerScreens() {
    //Navigation.registerComponent('com.rnfirebasestarter.App', () => App);
    Navigation.registerComponent('com.rnfirebasestarter.Account', () => Account);
    Navigation.registerComponent('com.rnfirebasestarter.Login', () => Login);
    Navigation.registerComponent('com.rnfirebasestarter.Signup', () => Signup);
}