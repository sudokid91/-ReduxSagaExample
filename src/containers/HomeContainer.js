import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { clearToken, clearData } from '../utils/storage';
import { NavigationActions, StackActions } from 'react-navigation';
 import {LOGIN, HOME, SPLASH} from '../utils/screenName';


class HomeContainer extends Component {
    logout = () => {
        clearToken();
        clearData('userName');
        const { navigation } = this.props;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: LOGIN }),
            ],
        });
        navigation.dispatch(resetAction);
    }
    render() {
        const { userInfo } = this.props.data
        return (
            <View style={styles.container}>               
                <Text style={styles.textInput}>User name: {userInfo.umUserName}</Text>
                <Text style={styles.textInput}>First name: {userInfo.firstName}</Text>
                <Text style={styles.textInput}>Last name: {userInfo.lastName}</Text>
                <Text style={styles.textInput}>Email: {userInfo.email}</Text>
                <Button style={styles.btnLogout} title="LogOut" onPress={() => this.logout()} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: {
                userInfo: state.login.userInfo
            }
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(32, 53, 70)',
    },
    textInput : {
        color: 'yellow',
        fontSize: 18,
        margin : 5
    },
    btnLogout : {
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default connect(mapStateToProps, null)(HomeContainer)