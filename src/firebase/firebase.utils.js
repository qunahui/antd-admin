import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyBoXzUYoFf6QRk8aLPlJzZcWjct1PZTJeo",
  authDomain: "blog-6e2e4.firebaseapp.com",
  databaseURL: "https://blog-6e2e4.firebaseio.com",
  projectId: "blog-6e2e4",
  storageBucket: "blog-6e2e4.appspot.com",
  messagingSenderId: "268737839704",
  appId: "1:268737839704:web:6934b8aaac08c07a6d002d"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
