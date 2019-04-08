import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCYfFVTYiyeT4VoNfgZkJgPufxuEm47Mxc',
  authDomain: 'pointless-notes.firebaseapp.com',
  databaseURL: 'https://pointless-notes.firebaseio.com',
  projectId: 'pointless-notes',
  storageBucket: 'pointless-notes.appspot.com',
  messagingSenderId: '3435337154'
};
firebase.initializeApp(config);

export default firebase;
