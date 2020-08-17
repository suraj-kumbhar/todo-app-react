import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBbUL1gBHY4vWcapSL05HO8W2StROpZ-mo',
  authDomain: 'todo-app-react-b9001.firebaseapp.com',
  databaseURL: 'https://todo-app-react-b9001.firebaseio.com',
  projectId: 'todo-app-react-b9001',
  storageBucket: 'todo-app-react-b9001.appspot.com',
  messagingSenderId: '250705155421',
  appId: '1:250705155421:web:5d657548f7d173602c44b4',
  measurementId: 'G-MTL2GW6QJ3',
});

const db = firebaseApp.firestore();

export { db };
