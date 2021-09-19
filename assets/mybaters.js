import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import firebase from 'firebase';
import db from '../config.js'

export default class MyDonationScreen extends Component {
  static navigationOptions = { header: null };

   constructor(){
     super()
     this.state = {
       userId : firebase.auth().currentUser.email,
       allTrades : [],
       donerName:''

     }
     this.requestRef= null
   }


   getAllDonations =()=>{
     this.requestRef = db.collection("all_donations").where("donor_id" ,'==', this.state.userId)
     .onSnapshot((snapshot)=>{
       var allDonations = snapshot.docs.map(document => document.data());
       this.setState({
         allDonations : allDonations,
       });
     })
   }
   sendbook=( bookDetails)=>{
     if(bookDetails.request_status==='book sent'){
       var requestStatus='doner intersted'
        db.collection('all_donations').doc(bookDetails.doc_id).update({
          'request_status':'doner interested'
        })
     }
   }
sendNotification=(bookDetails,requestStatus)=>{
  var requestId=bookDetails.request_id
  var donerId=bookDetails.doner_id
  db.collection("all_notifications")
  .where('request_id','==',requestId)
    .where('doner_id','==',donerId)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        var message ='' 
        if (requestStatus=== 'book sent'){
          message=this.state.donerName+'sent you book'
        }
        else{
           message=this.state.donerName+'has shown intrest in donationg'


        }
        db.collection('all_notifications').doc(doc.id).update({
          'message':message,
          'notification_status ':'unread',
         'date':firebase.firestore.FieldValue.serverTimestamp()
        })
      })
    })
}
   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
     <ListItem
       key={i}
       title={item.book_name}
       subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.request_status}
       leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
       rightElement={
           <TouchableOpacity style={styles.button}>
             <Text style={{color:'#ffff'}}>Send Book</Text>
           </TouchableOpacity>
         }
       bottomDivider
     />
   )


   componentDidMount(){
     this.getAllDonations()
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
       <View style={{flex:1}}>
          title="My Donations"
         <View style={{flex:1}}>
           {
             this.state.allDonations.length === 0
             ?(
               <View>
                 <Text style={{ fontSize: 20}}>List of all trades</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allDonations}
                 renderItem={this.renderItem}
               />
             )
           }
         </View>
       </View>
     )
   }
   }
