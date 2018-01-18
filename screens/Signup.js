'use strict';
import {
    ActivityIndicator,
    StyleSheet,
    Image
} from 'react-native';
import { Header,Title,Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button, View } from 'native-base';

import styles from '../styles/mainstyle.js';
import React, {Component} from 'react';
import Login from './Login';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';

var screenStyle = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    }
});

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            password: ''
        }
    }

    // A method to passs the username and password to firebase and make a new user account
    signup() {
        if (this.state.email && this.state.password) {
            this.setState({
                // When waiting for the firebase server show the loading indicator.
                loading: true
            });
            // Make a call to firebase to create a new user.
            firebase.auth().createUserWithEmailAndPassword(
                this.state.email,
                this.state.password).then(() => {
                // then and catch are methods that we call on the Promise returned from
                // createUserWithEmailAndPassword
                alert('Your account was created!');
                this.setState({
                    // Clear out the fields when the user logs in and hide the progress indicator.
                    email: '',
                    password: '',
                    loading: false
                });
                Navigation.dismissModal({
                    animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                });
            }).catch((error) => {
                // Leave the fields filled when an error occurs and hide the progress indicator.
                this.setState({
                    loading: false
                });
                alert("Account creation failed: " + error.message);
            });
        }
        else {
            alert('Signup Failed. Please make sure all fields have been filled out, and try again.');
        }
    }

    render() {
        // If we are loading then we display an ActivityIndicator.
        const content = this.state.loading ?
            <View>
                <ActivityIndicator size="large"/>
            </View>:
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
                <Button block onPress={this.signup.bind(this)}>
                    <Text>Signup</Text>
                </Button>
                <Button block light onPress={this.goToLogin.bind(this)} >
                    <Text>Back to Login</Text>
                </Button>
            </Content>
        ;
        // A simple UI with a toolbar, and content below it.
        return (
            <Container style={screenStyle.container}>
                {/*<Header>*/}
                    {/*<Title>Sign Up</Title>*/}
                {/*</Header>*/}
                <Image style={{resizeMode: 'center', width: 400}} source={require('../images/EpioneMain.png')} />
                {content}
            </Container>
        )
    }
    goToLogin(){
        Navigation.dismissModal({
            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
        // this.props.navigator.push({
        //     screen: 'com.rnfirebasestarter.Login',
        //     title: 'Login'
        // });
    }
}

export default Signup;