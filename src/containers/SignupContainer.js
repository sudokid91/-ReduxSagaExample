import React, { Component } from 'react';
import { Image,View, Text, StyleSheet,SafeAreaView,StatusBar,KeyboardAvoidingView,
    TouchableWithoutFeedback,TextInput, Keyboard, TouchableOpacity,ScrollView,Button } from 'react-native';

import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
// import { validate } from '../utils/validation';
import {LOGIN} from '../utils/screenName';
import {signUpAction} from '../actions/loginAction';
import { validationService } from "../validation/service";

class SignupContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
                umUserName: '',
                umUserPassword : '',
                firstName : '',
                lastName : '',
                email : '',
                address : '',
                year : '',
                month : '',
                date : '',
                checkSignup : false,
                msgError: '',
                inputs: {
                    userName: {
                      type: "generic",
                      value: ""
                    },
                    password: {
                        type: "password",
                        value: ""
                      },
                    first_name: {
                      type: "generic",
                      value: ""
                    },
                    last_name: {
                      type: "generic",
                      value: ""
                    },
                    email: {
                      type: "email",
                      value: ""
                    },
                    address: {
                      type: "generic",
                      value: ""
                    },
                    birthday_year: {
                      type: "year",
                      value: ""
                    },
                    birthday_month: {
                      type: "month",
                      value: ""
                    },
                    birthday_day: {
                      type: "day",
                      value: ""
                    }
                  }
        };
        this.onInputChange = validationService.onInputChange.bind(this);
        this.getFormValidation = validationService.getFormValidation.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentDidUpdate () {
        const {checkSignup} = this.props;
        if (checkSignup) {
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
    onCancel () {
        const { navigation } = this.props;
            const resetAction = StackActions.reset({
            index: 0, 
            actions: [
                NavigationActions.navigate({ routeName: LOGIN }),
            ],
            });
            navigation.dispatch(resetAction);
    }
    submit() {
        this.getFormValidation();
    }
    renderError(id) {
        const { inputs } = this.state;
        if (inputs[id].errorLabel) {
          return <Text style={styles.error}>{inputs[id].errorLabel}</Text>;
        }
        return null;
    }
    onError = (error) => {
        this.setState({msgError: error.message});
        this.refs.userName.focus();
    }
    render() {
        return (
        //     <SafeAreaView style={styles.container}>
        //     <StatusBar barStyle="light-content" />
        //         <KeyboardAvoidingView behavior='padding' style={styles.container}>
        //             <TouchableWithoutFeedback style={styles.container} 
        //                     onPress={Keyboard.dismiss}>
        //                 <View style={styles.containerView}>
        //                     <View style={styles.logoContainer}>
        //                         <Image style={styles.logo}
        //                             source={require('../images/logo.png')}>
        //                         </Image>
        //                         <Text style={styles.title}>Add New Account</Text>
        //                     </View>
        //                     <View style={styles.infoContainer}>
        //                         <TextInput style={styles.input}
        //                             placeholder="Enter username"
        //                             placeholderTextColor='rgba(255,255,255,0.8)'
        //                             keyboardType='email-address'
        //                             returnKeyType='next'
        //                             ref= {"txtUserName"}
        //                             autoCorrect={false}
        //                             onSubmitEditing={()=> this.refs.txtPassword.focus()}
        //                             onChangeText = {(text) => {this.setState({umUserName : text})}} 
        //                             value={this.state.umUserName}
        //                         />
        //                         <TextInput style={styles.input} 
        //                             placeholder="Enter password"
        //                             placeholderTextColor='rgba(255,255,255,0.8)'
        //                             returnKeyType='next'
        //                             secureTextEntry
        //                             autoCorrect={false}
        //                             ref={"txtPassword"}
        //                             onChangeText = {(text) => {this.setState({umUserPassword : text})}} 
        //                             value={this.state.umUserPassword}
        //                         />
        //                         <TextInput style={styles.input} 
        //                             placeholder="First name"
        //                             placeholderTextColor='rgba(255,255,255,0.8)'
        //                             returnKeyType='next'
        //                             autoCorrect={false}
        //                             onChangeText = {(text) => {this.setState({firstName : text})}} 
        //                             value={this.state.firstName}
        //                         />
        //                         <TextInput style={styles.input} 
        //                             placeholder="Last name"
        //                             placeholderTextColor='rgba(255,255,255,0.8)'
        //                             returnKeyType='next'
        //                             autoCorrect={false}
        //                             onChangeText = {(text) => {this.setState({lastName : text})}} 
        //                             value={this.state.lastName}
        //                         />
        //                         <TextInput style={styles.input} 
        //                             placeholder="Email"
        //                             placeholderTextColor='rgba(255,255,255,0.8)'
        //                             returnKeyType='go'
        //                             autoCorrect={false}
        //                             onChangeText = {(text) => {this.setState({email : text})}} 
        //                             value={this.state.email} 
        //                         />
        //                         <TouchableOpacity style={styles.buttonContainer} 
        //                                 onPress = {() => {
        //                                     const {umUserName,umUserPassword, firstName,lastName, email} = this.state;
        //                                     // const emailValidation = validate('email', email.trim())
        //                                     // const passwordValidation = validate('umUserPassword', umUserPassword.trim())
        //                                     // if (emailValidation.isError) {
        //                                     //     alert(emailValidation.messageError);
        //                                     //     this.refs.txtUserName.focus();
        //                                     // } else if (passwordValidation.isError) {
        //                                     //     alert(passwordValidation.messageError);
        //                                     //     this.refs.txtPassword.focus();
        //                                     // } else {
        //                                     //     this.props.onSignup({umUserName,umUserPassword,firstName,firstName,lastName,email});
        //                                     // }
        //                                     this.props.onSignup({umUserName,umUserPassword,firstName,firstName,lastName,email});
        //                                 }}
        //                             >
        //                                 <Text style={styles.buttonSave}>SAVE</Text>
        //                         </TouchableOpacity>
        //                         <TouchableOpacity style={styles.buttonContainer}  
        //                                 onPress = {() => { 
        //                                     this.onCancel();
        //                                 }}
        //                             >
        //                                 <Text style={styles.buttonCancel}>CANCEL</Text>
        //                             </TouchableOpacity>
        //                     </View>
        //                 </View>
        //             </TouchableWithoutFeedback>
        //         </KeyboardAvoidingView>
        // </SafeAreaView>
        <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo}
                source={require('../images/logo.png')}>
            </Image>
            <Text style={styles.title}>Add New Account</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View>
            <Text style={styles.textLabel}>Username</Text>
            <TextInput
            style={styles.input}
            ref={"userName"}
            onChangeText={value => {
                this.setState({msgError : ''});
                this.setState({umUserName : value});
                this.onInputChange({ id: "userName", value });
            }}
            />
            {this.renderError("userName")}
            <Text style={styles.error}>{this.state.msgError}</Text>
          </View>  

          <View>
            <Text style={styles.textLabel}>Password</Text>
            <TextInput
            style={styles.input}
            secureTextEntry
            returnKeyType='next'
            autoCorrect={false}
            onChangeText={value => {
                this.setState({umUserPassword : value});
                this.onInputChange({ id: "password", value });
            }}
            />
            {this.renderError("password")}
          </View> 

          <View>
            <Text style={styles.textLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={value => {
                  this.setState({firstName: value});
                this.onInputChange({ id: "first_name", value });
              }}
            />
            {this.renderError("first_name")}
          </View>

          <View>
            <Text style={styles.textLabel}>Last Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={value => {
                  this.setState({lastName: value});
                this.onInputChange({ id: "last_name", value });
              }}
            />
            {this.renderError("last_name")}
          </View>

          <View>
          <Text style={styles.textLabel}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => {
              this.setState({email: value});
              this.onInputChange({ id: "email", value });
            }}
          />
          {this.renderError("email")}
        </View>

        <View>
            <Text style={styles.textLabel}>Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={value => {
                  this.setState({address: value});
                this.onInputChange({ id: "address", value });
              }}
            />
            {this.renderError("address")}
          </View>

          <View>
            <Text style={styles.textLabel}>Birthday?</Text>
            <View style={styles.split}>
              <View style={{ flex: 1, marginRight: 5 }}>
                <TextInput
                style={styles.input}
                placeholder="Year"
                ref="year"
                onChangeText={value => {
                    this.setState({year: value});
                    this.onInputChange({ id: "birthday_year", value });
                }}
                />
                {this.renderError("birthday_year")}
              </View>
              <View style={{ flex: 1, marginRight: 5 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Month"
                  ref="month"
                  onChangeText={value => {
                    this.setState({month : value});
                    this.onInputChange({ id: "birthday_month", value });
                  }}
                />
                {this.renderError("birthday_month")}
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Day"
                  ref="day"
                  onChangeText={value => {
                    this.setState({date: value});
                    this.onInputChange({ id: "birthday_day", value });
                  }}
                />
                {this.renderError("birthday_day")}
              </View>
            </View>
          </View>
        </ScrollView>
                  
        <View style={styles.button}>
            <TouchableOpacity style={styles.buttonContainer} 
                onPress = {() => {
                    const {umUserName,umUserPassword, firstName,lastName, email, address, year, month, date} = this.state;
                    this.submit();
                    this.props.onSignup({umUserName,umUserPassword,firstName,firstName,lastName,email, address, birthday: year+"/"+month+"/"+date}, this.onError);
                }}
            >
                <Text style={styles.buttonSave}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}  
                onPress = {() => { 
                    this.onCancel();
                }}
            >
                <Text style={styles.buttonCancel}>CANCEL</Text>
            </TouchableOpacity>
        </View>
      </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        checkSignup : state.login.isSignupSuccess
    };
}

const mapDispatchToProps = (dispatch) => ({
    onSignup : (newUser, onError) => {
        dispatch(signUpAction(newUser,onError));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'rgb(32, 53, 70)',
//         flexDirection: 'column',
//     },
//     logoContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 2
//     },
//     containerView: {
//         flex: 1
//     },
//     logo: {
//         width: 128,
//         height: 56,
//     },
//     title: {
//         color: '#f7c744',
//         fontSize: 18,
//         textAlign: 'center',
//         marginTop: 5,
//         opacity: 0.9
//     },
//     infoContainer: {
//         flex : 8, 
//         marginHorizontal: 15, 
//         bottom: 10,
//     },
//     input: {
//         height: 40,
//         backgroundColor: 'rgba(255,255,255,0.2)',
//         color: '#FFF',
//         marginBottom: 20,
//         padding : 10
//     },
//     buttonContainer: {
//         backgroundColor: '#f7c744',
//         paddingVertical: 5, 
//         marginBottom : 5
//     },
//     buttonSave: {
//         textAlign: 'center',
//         color :'rgb(32, 53, 70)',
//         fontWeight: 'bold',
//         fontSize: 18
//     },
//     buttonCancel: {
//         textAlign: 'center',
//         color :'red',
//         fontWeight: 'bold',
//         fontSize: 18
//     }
// })


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        paddingTop: 50,
        flexDirection: 'column',
        backgroundColor: 'rgb(32, 53, 70)',
    },
    textLabel : {
        color: 'yellow',
        fontSize: 15
    },
    scrollView : {
        flex : 1,
        marginBottom: 150
    },
  logoContainer: {
        alignItems: 'center',
        justifyContent: 'center'
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
    input: {
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        marginBottom: 15,
        alignSelf: "stretch",
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF'
    },
    split: {
        flexDirection: "row"
    },
    error: {
        position: "absolute",
        bottom: 0,
        color: "red",
        fontSize: 12
    },
    button: {
        justifyContent: "center",
        marginVertical: 10,
        paddingVertical: 15,
        flexDirection: "row"
    },
    buttonSave: {
        textAlign: 'center',
        backgroundColor: "#f7c744",
        fontSize: 15,
        padding:10,
        borderWidth: 1,
        marginRight : 10
    },
    buttonCancel: {
        textAlign: 'center',
        backgroundColor : '#f7c744',
        fontSize: 15,
        padding: 10,
        borderWidth: 1
    }
});