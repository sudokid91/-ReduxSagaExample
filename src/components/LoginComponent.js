import React,{ Component } from 'react';
import {Text, ImageBackground, View, TextInput, StyleSheet, Image, Dimensions, TouchableOpacity
    ,SafeAreaView,StatusBar,KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import bgImage from '../images/background3.jpg';
import logo from '../images/logo.png';

const {width} = Dimensions.get('window');
export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidePwd: true, 
            umUserName: '', 
            umUserPassword:''
        }
    }
    onShowPassWord = () => {
        this.setState({hidePwd: !this.state.hidePwd});
    }
    render() {
        const {msgError} = this.props;
        return (
            <SafeAreaView style={styles.backgroundContainer}>
                <StatusBar barStyle="light-content" />
                    <KeyboardAvoidingView behavior='padding' style={styles.backgroundContainer}>
                        <TouchableWithoutFeedback style={styles.backgroundContainer} 
                            onPress={Keyboard.dismiss}>
                        <ImageBackground
                            style={styles.backgroundContainer}
                            source={bgImage}
                        >
                            <View style={styles.logoContainer}>
                                <Image
                                    style={styles.logo} 
                                    source={logo}
                                />
                                <Text style={styles.logoText}>REACT NATIVE</Text>
                            </View>

                            <View style={styles.infoContainer}>
                                <Icon name={'user'} size={28} color={'rgba(255,255,255,0.7)'}
                                    style={styles.inputIcon}
                                />
                                <TextInput 
                                    style={styles.input}
                                    placeholder={'Username'}
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    returnKeyType='next'
                                    autoCorrect={true}
                                    onSubmitEditing={()=> this.refs.txtPassword.focus()}
                                    onChangeText = {(text) => {this.setState({umUserName : text})}} 
                                    value={this.state.umUserName}
                                >
                                </TextInput>
                            </View>

                            <View style={styles.infoContainer}>
                                <Icon name={'lock'} size={28} color={'rgba(255,255,255,0.7)'}
                                    style={styles.inputIcon}
                                />
                                <TextInput 
                                    style={styles.input}
                                    placeholder={'Password'}
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    returnKeyType='go'
                                    secureTextEntry={this.state.hidePwd}
                                    autoCorrect={false}
                                    ref={"txtPassword"}
                                    onChangeText = {(text) => {this.setState({umUserPassword : text})}}
                                    value={this.state.umUserPassword}
                                />
                                <TouchableOpacity style={styles.btnShowPwd}
                                    onPress = {() => this.onShowPassWord()}
                                >
                                    <Icon name={this.state.hidePwd ? 'eye-slash' : 'eye'} size={26} color={'rgba(255,255,255,0.8)'}/>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.loginError}>{msgError.length > 0 ? msgError : ""}</Text>

                            <TouchableOpacity style={styles.btbLogin}
                                onPress = {() => {
                                const { umUserName, umUserPassword } = this.state;
                                if (!umUserName.length || !umUserPassword.length) {
                                    alert('You must enter info');
                                    return;
                                }
                                this.props.login({ umUserName: this.state.umUserName, umUserPassword: this.state.umUserPassword })
                            }}
                            >
                                <Text style={styles.text}>LOGIN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btbRegister}
                                onPress = {() => { 
                                    this.props.signup();
                                }}
                            >
                                <Text style={styles.text}>REGISTER</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
            );
    }
}

const styles = StyleSheet.create({
    backgroundContainer : {
        flex:1,
        width:null,
        height:null,
        justifyContent:'center',
        alignItems: 'center'
    },
    logoContainer : {
        alignItems:'center',
        marginBottom: 20
    },
    logo : {
        // width:width - 75,
        width:width,
        height:120
    },
    logoText : {
        fontSize:20,
        fontWeight:'bold',
        opacity: 0.5,
        color:'white'
    },
    infoContainer: {
        marginTop: 10
    },
    input : {
        width: width - 55,
        height: 45,
        borderRadius : 5,
        fontSize: 16, 
        paddingLeft:45,
        backgroundColor:'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    inputIcon : {
        position: 'absolute',
        top:10,
        left: 37
    },
    btnShowPwd :{
        position:'absolute',
        top:10,
        right: 37
    },
    btbLogin : {
        width: width - 55,
        height: 45,
        borderRadius : 5,
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor : 'rgb(66,103,178)'
    },
    btbRegister : {
        width: width - 55,
        height: 45,
        borderRadius : 5,
        justifyContent: 'center',
        marginTop: 5,
        backgroundColor : 'rgb(66,103,178)'
    },
    text : {
        textAlign: 'center',
        color : 'rgba(255,255,255,0.7)',
        fontSize: 16
    },
    loginError: {
        textAlign: 'center',
        color :'red',
        fontSize: 13
    }
})