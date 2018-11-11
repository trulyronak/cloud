import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import config from './config.js'

firebase.initializeApp(config);

firebase.firestore().settings({timestampsInSnapshots: true})

let firestore = firebase.firestore()
let storage = firebase.storage()
let TIMESTAMP = firebase.firestore.FieldValue.serverTimestamp()

export {firestore, storage, TIMESTAMP}