'use strict';
import {
    AppRegistry,
    Dimensions,
    ActivityIndicator,
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    Vibration,
    Button,
    FlatList,
    ToastAndroid,
    TouchableHighlight
} from 'react-native';
import React, {Component} from 'react';
import { Header, Container, Body, DeckSwiper, Title, Content, List, ListItem, InputGroup, Input, Icon, Picker, Badge, Card, CardItem, Tabs, Tab, Right, Left, Col, Row, StyleProvider, Fetch } from 'native-base';
import getTheme from '../native-base-theme/components'
import Login from './Login'
import firebase from 'react-native-firebase'
import call from 'react-native-phone-call'
import SendSMS from 'react-native-sms'

// Styles specific to the account page
const accountStyles = StyleSheet.create({
    email_container: {
        padding: 20
    },
    email_text: {
        fontSize: 18
    }
});
const configurationOptions = {
    debug: true
};

const window = Dimensions.get('window')

var db = firebase.app().database();

firebase.app().messaging().requestPermissions();
firebase.app().auth().signInWithEmailAndPassword('n.sandford@lancaster.ac.uk', 'Password123');

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:null,
            loading: true,
            number_of_items: 0,
            number_of_responses: 0,
            number_of_non_responses: 0,
            myNumber: '07654321234',
            token: null,
            notifications: [],
                // [{"type":"Danger","mobile":"07654321234","device_token":"f_JLDjJmM28:APA91bGpvsdxYH7SzgyVBo6Zw0DL9iTxyFoIqs7j907IS6hlp_qcwnSK7175DlaUTxM3K4ZQiWG1l2j2-fzVK_f0J6XJnxZ18MxWNQUMNM54gdzL28KavZ6PW3xVyDwOMn5Vlv6B4qQQ","message":"John's heart rate is dangerously high!","date":1511734105747},
                // {"type":"Warning","mobile":"07654321234","device_token":"f_JLDjJmM28:APA91bGpvsdxYH7SzgyVBo6Zw0DL9iTxyFoIqs7j907IS6hlp_qcwnSK7175DlaUTxM3K4ZQiWG1l2j2-fzVK_f0J6XJnxZ18MxWNQUMNM54gdzL28KavZ6PW3xVyDwOMn5Vlv6B4qQQ","message":"John's heart rate is too high!","date":1511734107741},
                // {"type":"Warning","mobile":"07654321234","device_token":"f_JLDjJmM28:APA91bGpvsdxYH7SzgyVBo6Zw0DL9iTxyFoIqs7j907IS6hlp_qcwnSK7175DlaUTxM3K4ZQiWG1l2j2-fzVK_f0J6XJnxZ18MxWNQUMNM54gdzL28KavZ6PW3xVyDwOMn5Vlv6B4qQQ","message":"John's heart rate is rising.","date":1511733107763}],
                // {"1000":{"type": 'Warning', "id": '1', "message": 'John has a higher heart rate than usual.', "mobile": '07549226284', "date": 1511734107741}},
                // {"2000":{"type": 'Update', "id":'2', "message": 'John\'s heart rate has dropped to a normal level', "mobile": '07549226284', "date": 1511734107741}},
                // {"3000":{"type": 'Danger', "id":'3', "message": 'John\'s heart rate has risen to a dangerous level', "mobile": '07549226284', "date": -1511734107741}}],
            //     {type: 'Warning', id:'4', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Update', id:'5', message: 'John\'s heart rate has dropped to a normal level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Danger', id:'6', message: 'John\'s heart rate has risen to a dangerous level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Warning', id:'7', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Update', id:'8', message: 'John\'s heart rate has dropped to a normal level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Danger', id:'9', message: 'John\'s heart rate has risen to a dangerous level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Warning', id:'10', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Update', id:'11', message: 'John\'s heart rate has dropped to a normal level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Danger', id:'12', message: 'John\'s heart rate has risen to a dangerous level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Warning', id:'13', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Update', id:'22', message: 'John\'s heart rate has dropped to a normal level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Danger', id:'23', message: 'John\'s heart rate has risen to a dangerous level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Warning', id:'24', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Update', id:'25', message: 'John\'s heart rate has dropped to a normal level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Danger', id:'26', message: 'John\'s heart rate has risen to a dangerous level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Warning', id:'27', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Update', id:'28', message: 'John\'s heart rate has dropped to a normal level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Danger', id:'29', message: 'John\'s heart rate has risen to a dangerous level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Warning', id:'210', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Update', id:'211', message: 'John\'s heart rate has dropped to a normal level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Danger', id:'212', message: 'John\'s heart rate has risen to a dangerous level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Warning', id:'213', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Update', id:'32', message: 'John\'s heart rate has dropped to a normal level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Danger', id:'33', message: 'John\'s heart rate has risen to a dangerous level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Warning', id:'34', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Update', id:'35', message: 'John\'s heart rate has dropped to a normal level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Danger', id:'36', message: 'John\'s heart rate has risen to a dangerous level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Warning', id:'37', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Update', id:'38', message: 'John\'s heart rate has dropped to a normal level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Danger', id:'39', message: 'John\'s heart rate has risen to a dangerous level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Warning', id:'310', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Update', id:'311', message: 'John\'s heart rate has dropped to a normal level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Danger', id:'312', message: 'John\'s heart rate has risen to a dangerous level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Warning', id:'313', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Update', id:'42', message: 'John\'s heart rate has dropped to a normal level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Danger', id:'43', message: 'John\'s heart rate has risen to a dangerous level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Warning', id:'44', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Update', id:'45', message: 'John\'s heart rate has dropped to a normal level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Danger', id:'46', message: 'John\'s heart rate has risen to a dangerous level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Warning', id:'47', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Update', id:'48', message: 'John\'s heart rate has dropped to a normal level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Danger', id:'49', message: 'John\'s heart rate has risen to a dangerous level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Warning', id:'410', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Update', id:'411', message: 'John\'s heart rate has dropped to a normal level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Danger', id:'412', message: 'John\'s heart rate has risen to a dangerous level', mobile: '07549226284', date: -1511734107741},
            //     {type: 'Warning', id:'413', message: 'John has a higher heart rate than usual.', mobile: '07549226284', date: -1511734107741}],
        };

        var that = this;

        firebase.app().messaging().getToken().then((token) => {
            that.state.token = token;
            //this.addUserToDatabase(token);
            this.sendTokenToServer(token);
            let carerId = "1222";
            let clientId = "100215073596927610169";
            db.ref("Carer/" + carerId + "/notification/" + clientId).orderByChild("date"/*, "device_token").equalTo(token*/).on("value", function(snapshot) {
                that.state.number_of_responses = 0;
                console.log("ORIGINAL NOTIFICATIONS: " + that.state.notifications);
                console.log('SNAPSHOT VALUE: ' + JSON.stringify(snapshot.val()));
                let results = [];
                snapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.val();//JSON.stringify(childSnapshot.val());
                    childData["id"] = childSnapshot.key;
                    console.log("CHILD ID: " + childSnapshot.key);
                    results.push(childData);
                    if (childData.response == true) that.state.number_of_responses += 1;
                });
                console.log('RESULTS' + results);//JSON.parse(JSON.stringify(results)));

                that.setState({notifications: results});
                that.setState({number_of_items: results.length});
                that.setState({number_of_non_responses: (that.state.number_of_items - that.state.number_of_responses)});
                console.log("UPDATED NOTIFICATIONS: " + that.state.notifications);
                console.log("NUMBER_OF_ITEMS: " + that.state.number_of_items);
                console.log("NUMBER_OF_RESPONSES: " + that.state.number_of_responses);
                console.log("NUMBER_OF_NON_RESPONSES: " + that.state.number_of_non_responses);
            });
            console.log('Device FCM Token: ', token);
        });

        firebase.app().messaging().onTokenRefresh((token) => {
            this.sendTokenToServer(token);
        });

        firebase.app().messaging().getInitialNotification()//.then(response => response.json())
            .then((payload) => {
                if (payload['fcm'].action == 'android.intent.action.VIEW' && payload.mobile != null) {
                    this.notify(payload.mobile, payload.message);
                    console.log('Notification which opened the app: ', payload);
                }
            });

        firebase.app().messaging().onMessage((message) => {
            if (!message.opened_from_tray) {
                this.notify(message.mobile, message.message);
                console.log('Notification received while app running: ', message);
            }
        });
    }

    componentWillMount() {
        // get the current user from firebase
        // const userData = this.props.firebaseApp.auth().currentUser;
        AsyncStorage.getItem('userData').then((user_data_json) => {
            let userData = JSON.parse(user_data_json);
            this.setState({
                user: firebase.app().auth().currentUser,
                loading: false
            });
        });
    }

    render() {
        // If we are loading then we display the indicator, if the account is null and we are not loading
        // Then we display nothing. If the account is not null then we display the account info.

        const tab1 = <Content>
            <List>
                <FlatList
                    pagingEnabled={true}
                    bounces={true}
                    data={this.state.notifications}
                    extraData={this.state}
                    ListHeaderComponent={() => (
                        <Button
                            title='These notifications require a response'
                            disabled
                            onPress={() => function() {}}/>
                    )}
                    renderItem={({item}) => (
                        item.response == false &&
                        <StyleProvider style={getTheme()}>
                            <Card>
                                {item.type === 'Danger' &&
                                <CardItem header danger>
                                    <Text style={{color: '#fff'}}>{item.type}</Text>
                                </CardItem>}
                                {item.type === 'Warning' &&
                                <CardItem header warning>
                                    <Text style={{color: '#fff'}}>{item.type}</Text>
                                </CardItem>}
                                {item.type === 'Update' &&
                                <CardItem header update>
                                    <Text style={{color: '#fff'}}>{item.type}</Text>
                                </CardItem>}
                                <CardItem>
                                    <Left>
                                        <Body>
                                        <Text>{item.message}</Text>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <Button
                                            title='Respond'
                                            onPress={() => this.patientOptions(item.mobile, item.id)}/>
                                    </Right>
                                </CardItem>
                                <CardItem footer>
                                    <Text>{this.dateAsString(Math.abs(item.date))}</Text>
                                </CardItem>
                            </Card>
                        </StyleProvider>
                    )}
                    keyExtractor={item => item.id}
                />
                {/*<Button*/}
                    {/*title='Send Notification'*/}
                    {/*onPress={() => this.sendNotification()}/>*/}
            {this.state.number_of_non_responses == 0 &&
            <CardItem header>
                <Text>All patient alerts have been responded to.</Text>
            </CardItem>}
        </List>
        </Content>;

        const tab2 = <Content>
            <List>
                <FlatList
                    pagingEnabled={true}tttt
                    bounces={true}
                    data={this.state.notifications}
                    extraData={this.state}
                    ListHeaderComponent={() => (
                        <Button
                            title='You have responded to these notifications'
                            disabled
                            onPress={() => function() {}}/>
                    )}
                    renderItem={({item}) => (
                        item.response == true &&
                        <StyleProvider style={getTheme()}>
                            <Card>
                                {item.type === 'Danger' &&
                                <CardItem header danger>
                                    <Text style={{color: '#fff'}}>{item.type}</Text>
                                </CardItem>}
                                {item.type === 'Warning' &&
                                <CardItem header warning>
                                    <Text style={{color: '#fff'}}>{item.type}</Text>
                                </CardItem>}
                                {item.type === 'Update' &&
                                <CardItem header update>
                                    <Text style={{color: '#fff'}}>{item.type}</Text>
                                </CardItem>}
                                <CardItem>
                                    <Left>
                                        <Body>
                                        <Text>{item.message}</Text>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <Button
                                            title='Follow Up'
                                            onPress={() => this.patientOptions(item.mobile, item.id)}/>
                                    </Right>
                                </CardItem>
                                <CardItem footer>
                                    <Text>{this.dateAsString(Math.abs(item.date))}</Text>
                                </CardItem>
                            </Card>
                        </StyleProvider>
                    )}
                    keyExtractor={item => item.id}
                />
            {this.state.number_of_responses == 0 &&
            <CardItem header>
                <Text>You have not responded to any patient alerts yet.</Text>
            </CardItem>}
        </List></Content>;

        // const content = //this.state.loading ?
        // //     <ActivityIndicator size="large"/> :
        // //     firebase.app().auth().currentUser &&
        //     <Content>
        //         {this.state.number_of_items == 0 ?
        //         <Card>
        //             <CardItem header>
        //                 <Text>No patient alerts to show at this time.</Text>
        //             </CardItem>
        //         </Card> :
        //             <View hasTabs>
        //                 <Tabs initialPage={0}>
        //                     <Tab heading="Unread">
        //                         {tab1}
        //                     </Tab>
        //                     <Tab heading="Read">
        //                         {tab2}
        //                     </Tab>
        //                 </Tabs>
        //
        //
        //             </View>}
        //         {/*<Button*/}
        //             {/*title='Logout'*/}
        //             {/*onPress={() => this.logout.bind(this)}/>*/}
        //         {/*<Button*/}
        //             {/*title='Vibrate'*/}
        //             {/*onPress={() => this.notify('07549226284')}/>*/}
        //     </Content>
        // ;

        // console.log("loading user",this.state.user,this.state.loading);
        return (
            <Container>
                <Header hasTabs style={{backgroundColor: 'white', height: 120}}>
                    <Body>
                    <Image style={{resizeMode: 'center', height: 100, width: window.width-10}} source={require('../images/EpioneMain.png')} />
                    </Body>
                </Header>
                <Tabs>
                    <Tab heading="Unread">
                        {tab1}
                    </Tab>
                    <Tab heading="Read">
                        {tab2}
                    </Tab>
                </Tabs>
            </Container>);
        {/*<Container>*/}
        {/*/!*<Header>*!/*/}
        {/*/!*<Title>Account</Title>*!/*/}
        {/*/!*</Header>*!/*/}
        {/*/!*<Image style={{resizeMode: 'center', height: 150, width: window.width}} source={require('../images/EpioneMain.png')} />*!/*/}
        {/*<Header hasTabs>*/}
        {/*<Tabs initialPage={0}>*/}
        {/*<Tab heading="Unread">*/}
        {/*{tab1}*/}
        {/*</Tab>*/}
        {/*<Tab heading="Read">*/}
        {/*{tab2}*/}
        {/*</Tab>*/}
        {/*</Tabs>*/}
        {/*</Header>*/}
        {/*</Container>*/}
    }

    dateAsString(date) {
        let dateStr = new Date(date);
        return dateStr.toUTCString();
    }

    goToPatients() {
        this.props.navigator.push({
            screen: 'com.rnfirebasestarter.Patients',
            title: 'Patients'
        });
    }

    patientOptions(mobile, notificationId) {
        Alert.alert(
            'Respond to Message',
            'How would you like to respond to this message?',
            [
                {text: 'Send SMS', onPress: () => this.textPatient(mobile, notificationId)},
                {text: 'Call Patient', onPress: () => this.callPatient(mobile, notificationId)},
            ],
            { cancelable: true }
        )
    }

    notify(mobile, message) {
        this.vibrate();
        Alert.alert(
            'Patient Alert!',
            message,
            //'Patient is in distress, refer to the dashboard for more infornation',
            [
                {text: 'Dissmiss', onPress: () => Vibration.cancel()},
                {text: 'Send SMS', onPress: () => this.textPatient(mobile)},
                {text: 'Call Patient', onPress: () => this.callPatient(mobile)},
            ],
            { cancelable: false }
        )
    }

    vibrate() {
        Vibration.vibrate([0, 500, 500], true);
    }

    callPatient(mobile, notificationId) {
        let args = {
            number: mobile, // String value with the number to call
            prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
        }
        Vibration.cancel();
        this.addResponse(notificationId);
        call(args).catch(console.error);
    }

    textPatient(mobile, notificationId) {
        Vibration.cancel();
        ToastAndroid.show('Message has been sent', ToastAndroid.LONG);
        this.addResponse(notificationId);
        // SendSMS.send({
        //     // body: 'Epione has alerted me that you may be unwell. Please can you text or call me back ASAP on' + this.state.myNumber + '. Thanks.',
        //     body: 'Epione has alerted me that you may be unwell. Please can you call or text me back ASAP. Thanks.',
        //     recipients: [mobile],
        //     successTypes: ['sent', 'queued'],
        // }, (completed, cancelled, error) => {
        //     console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
        // });
    }

    updateNotifications(message) {
        this.state.notifications = message;
    }

    sendNotification() {
        let notificationId = 10;
        db.ref('notification/' + this.state.token + "/" + notificationId).set({
            id: notificationId,
            type: "Warning",
            message: "Mary's heart rate has returned to a normal level.",
            mobile: "07654321234",
            response: false,
            date: -1512667674225,
        });
    }

    sendTokenToServer(token) {
        let user = firebase.app().auth().currentUser;
        let userId = 1222;
        db.ref('Carer/' + userId).update({
            device_token: token,
        });
    }

    addResponse(notificationId) {
        let carerId = "1222";
        let clientId = "100215073596927610169";
        db.ref("Carer/" + carerId + "/notification/" + clientId + "/" + notificationId).update({
            response: true,
        });
    }

    addUserToDatabase(token) {
        let user = firebase.app().auth().currentUser;
        let userId = 1222;
        db.ref('Carer/' + user.uid).set({ //L1QPsWtOzMbyOnbnMRT1if0FFCI2').set({
            device_token: token,
            name: user.displayName,
            email: user.email,
            mobile: '07654321234',
        });
    }

    logout() {
        // logout, once that is complete, return the user to the login screen.
        AsyncStorage.removeItem('userData').then(() => {
            firebase.app().auth().signOut()
        }).then(() => {
            this.props.navigator.push({
                screen: 'com.rnfirebasestarter.Login',
                title: 'Login'
            });
        });
    }
}

AppRegistry.registerComponent('Account', () => Account);
export default Account;
