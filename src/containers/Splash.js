import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getToken, clearToken, getData } from '../utils/storage';
import * as loginActions from '../actions/loginAction';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {LOGIN,HOME} from '../utils/screenName';

class Splash extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.checkSignInStatus();
        }, 500);
    }

    onSuccess = (data) => {
        const { navigation } = this.props;
        let routeName = LOGIN;
        if (data) {
            routeName = HOME;
        }
        setTimeout(() => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName }),
                ],
            });
            navigation.dispatch(resetAction);
        }, 300);
    }

    onError = (error) => {
        console.log(`error`);
        try {
            clearToken();
            const { navigation } = this.props;
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: LOGIN }),
                ],
            });
            navigation.dispatch(resetAction);
        } catch (e) {
            this.setState({});
        }
    }
    getUserName = async (fieldName) => {
        return await getData(fieldName);
    }
    getUserToKen = async () => {
        return await getToken();
    }
    checkSignInStatus = async () => {
        const userName = await getData('userName');
        const token = await getToken();
        if (token && token.length > 0) {
            const data = {umUserName : userName}; 
            this.props.actions.user.fetchUserInfo(data, token,this.onSuccess, this.onError);
        } else {
            const { navigation } = this.props;
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: LOGIN }),
                ],
            });
            navigation.dispatch(resetAction);
        }     
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>SPLASH SCREEN</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
})

const mapDispatchToProps = (dispatch) => ({
    actions: {
        user: bindActionCreators(loginActions, dispatch)
    }
})
export default connect(null, mapDispatchToProps)(Splash)


