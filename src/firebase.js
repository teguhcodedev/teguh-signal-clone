// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDXeRVmi4Ic1rByokb766lXbtT7HBKYyo4",
    authDomain: "teguh-signal-clone.firebaseapp.com",
    projectId: "teguh-signal-clone",
    storageBucket: "teguh-signal-clone.appspot.com",
    messagingSenderId: "147346520332",
    appId: "1:147346520332:web:82ab9a24e0e5918de9f129",
    measurementId: "G-6JC4M21NT5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth();
  const db = firebaseApp.firestore();
  const provider = new firebase.auth.GoogleAuthProvider()

  export {auth,provider}
  export default db;