import  firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyBJ8E6uo6OqmohUFmC3luOqo4OerrbV-b4",
  authDomain: "cars-1d007.firebaseapp.com",
  databaseURL: "https://cars-1d007-default-rtdb.firebaseio.com",
  projectId: "cars-1d007",
  storageBucket: "cars-1d007.appspot.com",
  messagingSenderId: "960602537626",
  appId: "1:960602537626:web:eddec9255b318deda42923"
};

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
