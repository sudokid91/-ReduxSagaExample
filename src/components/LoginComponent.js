import React, { Component } from 'react';

import {
    Text, View, Image, Alert, Platform, TextInput, FlatList, ActivityIndicator, SafeAreaView, 
    StatusBar, KeyboardAvoidingView,TouchableWithoutFeedback,StyleSheet, Keyboard, TouchableOpacity
} from 'react-native';

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        // this.state = { email: '', password: ''};
        this.state = { umUserName: '', umUserPassword:''}
    }

    render() {
        const {msgError} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <TouchableWithoutFeedback style={styles.container} 
                            onPress={Keyboard.dismiss}>
                        <View style={styles.logoContainer}>
                            <View style={styles.logoContainer}>
                                <Image style={styles.logo}
                                    source={require('../images/logo.png')}>
                                </Image>
                                <Text style={styles.title}>Account Information</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <TextInput style={styles.input}
                                    placeholder="Enter username"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    onSubmitEditing={()=> this.refs.txtPassword.focus()}
                                    onChangeText = {(text) => {this.setState({umUserName : text})}} 
                                    value={this.state.umUserName}
                                />
                                <TextInput style={styles.input} 
                                    placeholder="Enter password"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    returnKeyType='go'
                                    secureTextEntry
                                    autoCorrect={false}
                                    ref={"txtPassword"}
                                    onChangeText = {(text) => {this.setState({umUserPassword : text})}}
                                    value={this.state.umUserPassword}
                                    
                                />
                                <Text style={styles.loginError}>{msgError.length > 0 ? msgError : ""}</Text>
                                <TouchableOpacity style={styles.buttonContainer} 
                                    onPress = {() => {
                                        this.props.logInGoogle();
                                    }} 
                                >
                                    <Text style={styles.buttonSignin}>Login With Google</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonContainer} 
                                    onPress = {() => {
                                        this.props.logInFB();
                                    }} 
                                >
                                    <Text style={styles.buttonSignin}>Login With Facebook</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonContainer} 
                                    onPress = {() => {
                                        const { umUserName, umUserPassword } = this.state;
                                        if (!umUserName.length || !umUserPassword.length) {
                                            alert('You must enter info');
                                            return;
                                        }
                                        this.props.login({ umUserName: this.state.umUserName, umUserPassword: this.state.umUserPassword })
                                    }}
                                >
                                    <Text style={styles.buttonSignin}>SIGN IN</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonContainer}  
                                    onPress = {() => { 
                                        this.props.signup();
                                    }}
                                >
                                    <Text style={styles.buttonSignup}>SIGN UP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(32, 53, 70)',
        flexDirection: 'column',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    logo: {
        width: 128,
        height: 56,
    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 280,
        padding: 20,
        // backgroundColor: 'red'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#f7c744',
        paddingVertical: 15, 
        marginBottom : 5
    },
    buttonSignin: {
        textAlign: 'center',
        color :'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 18
    },
    buttonSignup: {
        textAlign: 'center',
        color :'#4267b2',
        fontWeight: 'bold',
        fontSize: 18
    },
    loginError: {
        textAlign: 'center',
        color :'red',
        fontSize: 13
    }
})