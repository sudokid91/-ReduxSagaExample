import React, { Component } from 'react';

import {ImageBackground,
    Text, View, Alert, Platform, TextInput, FlatList, ActivityIndicator, SafeAreaView, 
    StatusBar, KeyboardAvoidingView,TouchableWithoutFeedback,StyleSheet, Keyboard, TouchableOpacity
} from 'react-native';

import { Button, Input, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                        <View style={styles.container}>
                            <View style={styles.logoContainer}>
                                <Image style={styles.logo}
                                    source={require('../images/logo.png')}>
                                </Image>
                                <Text style={styles.title}>Account Information</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Input
                                     style={styles.input}
                                     leftIcon={{ type: 'font-awesome', name: 'user', color:'rgba(32, 53, 70, 0.5)'} }
                                     placeholder="Enter username"
                                     placeholderTextColor='rgba(255,255,255,0.8)'
                                     keyboardType='email-address'
                                     returnKeyType='next'
                                     autoCorrect={true}
                                     onSubmitEditing={()=> this.refs.txtPassword.focus()}
                                     onChangeText = {(text) => {this.setState({umUserName : text})}} 
                                     value={this.state.umUserName}
                                />
                                <Input style={styles.input} 
                                    leftIcon={{ type: 'font-awesome', name: 'lock', color:'rgba(32, 53, 70, 0.5)'}}
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
                                <Button
                                    title="Sign In"
                                    icon ={<Icon
                                        size={15}
                                        color="white"
                                        />}
                                    onPress = {() => {
                                        const { umUserName, umUserPassword } = this.state;
                                        if (!umUserName.length || !umUserPassword.length) {
                                            alert('You must enter info');
                                            return;
                                        }
                                        this.props.login({ umUserName: this.state.umUserName, umUserPassword: this.state.umUserPassword })
                                    }}
                                    containerStyle={styles.btnLogin}
                                    />
                                    <Button
                                    title="Sign Up"
                                    icon ={<Icon
                                        size={15}
                                        color="white"
                                        />}
                                        onPress = {() => { 
                                            this.props.signup();
                                        }}
                                    />   
                            </View>
                            <View style={styles.footer}>
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
        backgroundColor: 'rgb(184,116,120)',  
        flexDirection: 'column',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1
    },
    logo: {
        width: 128,
        height: 56
    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
    infoContainer: {
        padding: 10,
        marginHorizontal: 10,
        flex: 1, 
        backgroundColor: 'rgb(184,116,120)'
    },
    input: {
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 5,
        left: 20
    },
    buttonContainer: {
        backgroundColor: '#f7c744',
        paddingVertical: 15, 
        marginBottom : 5
    },
    buttonSignin: {
        // textAlign: 'center',
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
    btnLogin: {
        marginBottom : 5, 
        backgroundColor: 'yellow'
    },
    loginError: {
        textAlign: 'center',
        color :'red',
        fontSize: 13
    },
    footer : {
        flex: 1
    }
})