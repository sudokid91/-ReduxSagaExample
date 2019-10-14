import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions, StackActions } from 'react-navigation';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

import * as loginActions from '../actions/loginAction'; 
import { saveToken, setData } from '../utils/storage';
import { HOME,SIGNUP } from '../utils/screenName';
import Login from '../components/LoginComponent';
import {appId} from '../contants/fbUtils';
import {urlFetchGoogle,androidClientId, androidStandaloneAppClientId, iosClientId, iosStandaloneAppClientId, expoClientId} from '../contants/googleUtils';

class LoginContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoading: false,
            msgError : ''
        }
    }
    
    onSuccess = (data) => {
        const dataJson = JSON.parse(data);
        let token = dataJson.data.access_token;
        let userJson = JSON.parse(dataJson.config.data);
        let umUserName = userJson.umUserName;
        //save username storage
        if (umUserName && umUserName.length > 0) {
            setData('userName',umUserName).then(isSuccess =>{
                //do something
            }).catch( err=> console.log(`error save user into storega`));
        }
        this.setState({ isLoading: false })
        if (token && token.length > 0) {
            saveToken(token).then((isSuccess) => {
                if (isSuccess) {
                    const { navigation } = this.props;
                    const resetAction = StackActions.reset({
                        index: 0, 
                        actions: [
                            NavigationActions.navigate({ routeName: HOME }),
                        ],
                    });
                    navigation.dispatch(resetAction);
                }
            });
        }
    }
    onError = (error) => {
        this.setState({ isLoading: false });
        this.setState( {msgError : 'Username or password invalid!'});
    }
    login = (params) => {
        this.setState({ isLoading: true })
        this.props.actions.login.loginAction({ umUserName: params.umUserName.trim(), umUserPassword: params.umUserPassword.trim() }, this.onSuccess, this.onError);  
    }
    signup = () => {
        const { navigation } = this.props;
        const resetAction = StackActions.reset({
            index: 0, 
            actions: [
                NavigationActions.navigate({ routeName: SIGNUP }),
            ],
        });
        navigation.dispatch(resetAction);
    }

    async logInFB () {
        try {
          const {type,token} = await Facebook.logInWithReadPermissionsAsync(appId, {
            permissions: ['public_profile','email'],
          });
          if (type === 'success') {
            let urlFB = `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`;
              let config = { 
                headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                      }
              }
            // Get the user's name using Facebook's Graph API
            const response = await fetch(urlFB,config)
            const userInfo = await response.json();
            console.log(`user info facebook: ${JSON.stringify(userInfo)}`);
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }

    logInGoogle = async () => {
        const config = {
            expoClientId: expoClientId,
            iosClientId,
            androidClientId,
            iosStandaloneAppClientId,
            androidStandaloneAppClientId
            };
        const { type, accessToken, user } = await Google.logInAsync(config);
        if (type === 'success') {
            // Then you can use the Google REST API
            let userInfoResponse = await fetch(urlFetchGoogle, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
            let userInfo = await userInfoResponse.json();
            console.log(`user info google: ${JSON.stringify(userInfo)}`);
        }
    }
    render() {
        return (
            <Login
                logInGoogle={this.logInGoogle}
                logInFB={this.logInFB}
                login={this.login}
                signup = {this.signup}
                msgError = {this.state.msgError}
            />
        );
    }
}

const mapStateToProps = (state) => { 
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {    
        // onLogin: (user) => {
        //     dispatch(loginAction(user));
        // }, 
        actions: {
            login: bindActionCreators(loginActions, dispatch),
            fetchUserInfo : bindActionCreators(loginActions, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer); 
