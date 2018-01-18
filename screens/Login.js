'use strict';
import {
    View,
    ActivityIndicator,
    Image,
    Button
} from 'react-native';

import { Header, Container, Title, Content, Text, List, Form, Item, ListItem, Label, InputGroup, Input, Icon, Picker, Thumbnail} from 'native-base';
import React, { Component } from 'react';
import Signup from './Signup';
import Account from './Account';
import styles from '../styles/mainstyle.js';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';
//import { Col, Row, Grid } from "react-native-easy-grid";


class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            email: '',
            password: ''
        }

        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
            // play services are available. can now configure library
        })
            .catch((err) => {
                console.log("Play services error", err.code, err.message);
            })
    }

    render() {
        // If we are loading then we display an ActivityIndicator.
        const content = this.state.loading ?
            <View>
                <ActivityIndicator size="large"/>
            </View> :

            <Content>
                <List>
                    <ListItem>
                        <InputGroup>
                            <Icon name="ios-person" style={{ color: 'grey' }} />
                            <Input
                                onChangeText={(text) => this.setState({email: text})}
                                value={this.state.email}
                                placeholder={"Email Address"} />
                        </InputGroup>
                    </ListItem>
                    <ListItem>
                        <InputGroup>
                            <Icon name="ios-unlock" style={{ color: 'grey' }} />
                            <Input
                                onChangeText={(text) => this.setState({password: text})}
                                value={this.state.password}
                                secureTextEntry={true}
                                placeholder={"Password"} />
                        </InputGroup>
                    </ListItem>
                </List>
                <Button block onPress={this.login.bind(this)}>
                    <Text>Login</Text>
                </Button>
                <Button block light onPress={this.goToSignup.bind(this)}>
                    <Text>Don't have an account?</Text>
                </Button>
            </Content>
        ;

        // A simple UI with a toolbar, and content below it.

        return (
            <Container>
                {/*<Header>*/}
                    {/*<Title>Login</Title>*/}
                {/*</Header>*/}
                <Image style={{resizeMode: 'center', width: 400}} source={require('../images/EpioneMain.png')} />

                {content}

            </Container>
        );
    }

    _signIn() {

    }

    login(){
        if (this.state.email && this.state.password) {
            this.setState({
                loading: true
            });
            // Log in and display an alert to tell the user what happened.
            firebase.app().auth().signInWithEmailAndPassword(this.state.email, this.state.password
            ).then(() => {
                this.props.navigator.push({
                    screen: 'com.rnfirebasestarter.Account',
                    title: this.state.email
                });
            }).catch((error) => {
                this.setState({
                    loading: false
                });
                alert('Login Failed. Please try again'+error);
            });
        } else {
            alert('Login Failed. Please make sure all fields have been filled out, and try again.');
        }
    }

    // Go to the signup page
    goToSignup(){
        Navigation.showModal({
            screen: "com.rnfirebasestarter.Signup", // unique ID registered with Navigation.registerScreen
            title: "Signup", // title of the screen as appears in the nav bar (optional)
            passProps: {}, // simple serializable object that will pass as props to the modal (optional)
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
            animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
        });
    }
}

export default Login;
