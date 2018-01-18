import React from 'react';
import firebase from 'react-native-firebase';
import { Vibration, Alert } from 'react-native';
import Login from './screens/Login';
import Account from "./screens/Account";
import { Navigation } from 'react-native-navigation';
import call from 'react-native-phone-call'
import SendSMS from 'react-native-sms'
import { registerScreens } from './screens';

registerScreens();



//If user is logged in, take them to the Account page, else Login page.
// if (!firebase.app().auth().currentUser) {
//     Navigation.startSingleScreenApp({
//         screen:
//             {
//                 screen: 'com.rnfirebasestarter.Login',
//                 title: 'Login'
//             }
//     });
// }
// else {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'com.rnfirebasestarter.Account',
            title: 'Patient Notifications',
        },
        appStyle: {
            navigationBarColor: '#000000',
            navBarTransparent:true,
            drawUnderNavBar: true,
        },
    });
// }



class App extends React.Component {

    constructor() {
        super();
        this.unsubscriber = null;
        this.state = {
            user: firebase.app().auth().currentUser,
        };
    }

    /**
     * Listen for any auth state changes and update component state
     */
    componentDidMount() {
        this.unsubscriber = firebase.app().auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });
    }

    componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
        }
    }
    //
    // notify(mobile) {
    //     this.vibrate();
    //     Alert.alert(
    //         'Patient Alert!',
    //         'Patient is in distress, refer to the dashboard for more infornation',
    //         [
    //             {text: 'Dissmiss', onPress: () => Vibration.cancel()},
    //             {text: 'Send SMS', onPress: () => this.textPatient(mobile)},
    //             {text: 'Call Patient', onPress: () => this.callPatient(mobile)},
    //         ],
    //         { cancelable: false }
    //     )
    // }
    //
    // callPatient(mobile) {
    //     let args = {
    //         number: mobile, // String value with the number to call
    //         prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
    //     }
    //     Vibration.cancel();
    //     call(args).catch(console.error);
    // }
    //
    // textPatient(mobile) {
    //     Vibration.cancel();
    //     SendSMS.send({
    //         // body: 'Epione has alerted me that you may be unwell. Please can you text or call me back ASAP on' + this.state.myNumber + '. Thanks.',
    //         body: 'Epione has alerted me that you may be unwell. Please can you call or text me back ASAP. Thanks.',
    //         recipients: [mobile],
    //         successTypes: ['sent', 'queued'],
    //     }, (completed, cancelled, error) => {
    //         console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
    //     });
    // }

}

export default App;