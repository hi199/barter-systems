import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import AddItemsScreen from '../screens/Additems'
import SettingsScreeen from '../screens/settingsScreen'
export const AppStackNavigator = createStackNavigator({
  Itemslist : {
     screen : AddItemsScreen,
     navigationOptions:{
       headerShown:false
     }
    },
      Tradde : {
     screen : RequesteeInfoScreen,
     navigationOptions:{
       headerShown:false
     }
    },
    
  },
  {
    initialRouteName : 'BookDonateList'
  })
