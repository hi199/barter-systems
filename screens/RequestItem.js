import React,{Component} from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'

export default class ItemScreen extends Component{
  constructor(){
    super()
    this.state = { 
      userId: firebase.auth().currentUser.email,
      itemName: '',
      reasonToRequest: '',
      requestedItemName:'',
      itemStatus:'',
      requestId:'',
      docId:'',
      userDocId:'',
dataSource:'',
showFlatlist:false,
 requestedItemsList:'',

    }
  this.requestRef= null
  }

  getRequestedItemsList =()=>{
    this.requestRef = db.collection("requested_items")
    .onSnapshot((snapshot)=>{
      var requestedItemsList = snapshot.docs.map(document => document.data());
      this.setStat({
        requestedItemsList : requestedItemsList
      });
    })
  }
getItemRequest = () => {
    var itemrequest = db
      .collection('requested_items')
      .where('user_id', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().item_status != 'recived') {
            this.setState({
              requestId: doc.data().request_id,
              requesteditemName: doc.data().item_name,

              itemStatus: doc.data().item_status,
              docId: doc.id,
            });
          }
        });
      });
  };
  
  getIsItemRequestActtive() {
    db.collection('users')
      .where('email_id', '==', this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            IsItemRequestActive: doc.data().IsItemRequestActive,
            userdocid: doc.id,
          });
        });
      });
  }
  componentDidMount(){
    this.getRequestedItemsList()
    this.getItemRequest();
    this.getIsItemRequestActtive();
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    if (this.state.IsItemRequestActive === true) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text>item name</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>item status</Text>
          </View>
          <TouchableOpacity
          onPress={()=>{
            this.sendNotification()
            this.updateItemRequestStatus()
            this.recivedItem()
            }}>
            
            <Text>i received the book</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.reason_to_request}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}>
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          {
            this.state.requestedItemsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested Items</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedItemsList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
