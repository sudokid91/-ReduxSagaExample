import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginContainer from '../containers/LoginContainer';
import HomeContainer from '../containers/HomeContainer';
import SignupContainer from '../containers/SignupContainer';
import Splash from '../containers/Splash';

import {LOGIN, HOME, SIGNUP, SPLASH} from '../utils/screenName';
 
const MainNavigator = createStackNavigator(
    {
        SPLASH : {screen: Splash},
        LOGIN: { screen: LoginContainer },
        HOME: { screen: HomeContainer },
        SIGNUP : {screen : SignupContainer}       
    }, {
        // see next line
        headerMode: 'none',
    })

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer