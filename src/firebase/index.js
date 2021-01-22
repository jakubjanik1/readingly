import firebase from 'firebase/app'
import 'firebase/storage'

const config = {
    storageBucket: 'readingly-ab5f7.appspot.com',
}

export const app = firebase.initializeApp(config)
export const storage = app.storage().ref()