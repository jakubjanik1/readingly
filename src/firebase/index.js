import firebase from 'firebase/app'
import 'firebase/storage'

const config = {
    apiKey: 'AIzaSyCNM7ZDnt4iVDFB2ynEDroJGocl3fuZEwU',
    authDomain: 'readingly-ab5f7.firebaseapp.com',
    databaseURL: 'https://readingly-ab5f7.firebaseio.com',
    projectId: 'readingly-ab5f7',
    storageBucket: 'readingly-ab5f7.appspot.com',
    messagingSenderId: '716264989384',
    appId: '1:716264989384:web:bd3284498a6b8a74e63bfd'
}

export const app = firebase.initializeApp(config)
export const storage = app.storage().ref()