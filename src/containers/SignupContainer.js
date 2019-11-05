import React, { Component } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar, KeyboardAvoidingView,
  TouchableWithoutFeedback, TextInput, Keyboard, TouchableOpacity, ScrollView, ImageBackground
} from 'react-native';

import { Button, Input, Image, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
// import { validate } from '../utils/validation';
import { LOGIN } from '../utils/screenName';
import { signUpAction } from '../actions/loginAction';
import { validationService } from "../validation/service";

import theme from '../images/theme-final.jpg';
class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      umUserName: '',
      umUserPassword: '',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      year: '',
      month: '',
      date: '',
      checkSignup: false,
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
  componentDidUpdate() {
    const { checkSignup } = this.props;
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
  onCancel() {
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
    this.setState({ msgError: error.message });
    this.refs.userName.focus();
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <TouchableWithoutFeedback style={styles.container} >
          <ImageBackground style={styles.bgImage} source={theme}>
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image style={styles.logo}
                  source={require('../images/logo.png')}>
                </Image>
                <Text style={styles.title}>Add New Account</Text>
              </View>
              <View style={styles.scrollView}>
                <ScrollView style={styles.scrollInfo}>
                  <View>
                    <Text style={styles.textLabel}>Username</Text>
                    <TextInput
                      style={styles.input}
                      ref={"userName"}
                      onChangeText={value => {
                        this.setState({ msgError: '' });
                        this.setState({ umUserName: value });
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
                        this.setState({ umUserPassword: value });
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
                        this.setState({ firstName: value });
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
                        this.setState({ lastName: value });
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
                        this.setState({ email: value });
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
                        this.setState({ address: value });
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
                            this.setState({ year: value });
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
                            this.setState({ month: value });
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
                            this.setState({ date: value });
                            this.onInputChange({ id: "birthday_day", value });
                          }}
                        />
                        {this.renderError("birthday_day")}
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
              <View style={styles.button}>
                <Button
                  title='Save'
                  style={{ flex: 1, marginRight: 5, backgroundColor : 'rgb(66,103,178)' }}    
                  onPress={() => {
                    const { umUserName, umUserPassword, firstName, lastName, email, address, year, month, date } = this.state;
                    this.submit();
                    this.props.onSignup({ umUserName, umUserPassword, firstName, firstName, lastName, email, address, birthday: year + "/" + month + "/" + date }, this.onError);
                  }}
                />
                <Button
                  style={{ flex: 1, marginRight: 5 }}
                  title='Cancel'
                  onPress={() => {
                    this.onCancel();
                  }}
                />
              </View>
            </View>
            </ImageBackground>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    checkSignup: state.login.isSignupSuccess
  };
}

const mapDispatchToProps = (dispatch) => ({
  onSignup: (newUser, onError) => {
    dispatch(signUpAction(newUser, onError));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 8,
    // paddingTop: 50,
    flexDirection: 'column'
  },
  bgImage : {
    flex:1,
    width:null,
    height:null,
    justifyContent:'center',
    alignItems: 'center'
  },
  textLabel: {
    color: 'yellow',
    fontSize: 15
  },
  scrollView: {
    flex: 3,
    paddingBottom: 20
  },
  scrollInfo: {
    // paddingBottom: 130
  },
  logoContainer: {
    flex: 1,
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
    borderRadius: 5,
    backgroundColor:'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,0.7)',
    padding: 10,
    marginBottom: 15,
    alignSelf: "stretch"
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
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: "row",
    width: 120,
    marginHorizontal: 100
  },
  buttonSave: {
    flex: 1,
    backgroundColor : 'rgb(66,103,178)'
  },
  buttonCancel: {
    flex: 1
  }
});