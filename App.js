import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import SignupScreen from './screens/signup'
import {AppTabNavigator} from './components/AppTabNav'
import{ AppDrawerNavigator }from './components/AppDrawerNavigator'
export default class App extends React.Component {
  render(){
    return (
      
        <AppContainer />
        
      
    );
  }
}



const switchNavigator = createSwitchNavigator({
  SignupScreen:{screen:SignupScreen },
  Drawer:{screen: AppDrawerNavigator},
  BottemTab:{screen:AppTabNavigator}
})

const AppContainer =  createAppContainer(switchNavigator);
