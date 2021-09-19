import React, { Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity,Image} from 'react-native';
import { DrawerItems} from 'react-navigation-drawer'
import { Avatar } from "react-native-elements";
import firebase from 'firebase';

export default class CustomSideBarMenu extends Component{
  state = {
    userId: firebase.auth().currentUser.email,
    image: "#",
    name: "",
    docId: "",
  };

  render(){
    return(
      <View style={{flex:1}}>
        <View style={styles.drawerItemsContainer}>
        <Avatar
            rounded
            source={{
              uri: this.state.image,
            }}
            size={"xlarge"}
            onPress={() => this.selectPicture()}
            showEditButton
          />

          <DrawerItems {...this.props}/>
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutButton}
          onPress = {() => {
              this.props.navigation.navigate('SignUpScreen')
              firebase.auth().signOut()
          }}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container : {
    flex:1
  },
  drawerItemsContainer:{
    flex:0.8
  },
  logOutContainer : {
    flex:0.2,
    justifyContent:'flex-end',
    paddingBottom:30
  },
  logOutButton : {
    height:30,
    width:'100%',
    justifyContent:'center',
    padding:10
  },
  logOutText:{
    fontSize: 30,
    fontWeight:'bold'
  }
})