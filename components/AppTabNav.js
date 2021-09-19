import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AddItemScreen from '../screens/Additems';
import ItemScreen from '../screens/RequestItem';



export const AppTabNavigator = createBottomTabNavigator({
  AddItem :
   {
    screen:AddItemScreen ,
    navigationOptions :{
      tabBarLabel : "Add items",
    }
  },
  Item: {
    screen: ItemScreen,
    navigationOptions :{
      tabBarLabel : "item Request",
    }
  }
});
