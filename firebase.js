import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzKtzAvKwIlBRtLQWM6D4DjFCzh5GkN40",
  authDomain: "chat-ap-4326b.firebaseapp.com",
  databaseURL: "https://chat-ap-4326b.firebaseio.com",
  projectId: "chat-ap-4326b",
  storageBucket: "chat-ap-4326b.appspot.com",
  messagingSenderId: "234484165039",
  appId: "1:234484165039:web:b47665b0e0f69d28cba75a"

};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth, firebase };



  // apiKey: "AIzaSyDOQEz1TTSgkznhSZX8mHkWsGDXvuGAsFI",
  // authDomain: "ig-clone-99d1c.firebaseapp.com",
  // projectId: "ig-clone-99d1c",
  // storageBucket: "ig-clone-99d1c.appspot.com",
  // messagingSenderId: "272179859383",
  // appId: "1:272179859383:web:3232dbbf94b601929e6232",
  // measurementId: "G-PRGN8DH87Z",

// apiKey: "AIzaSyC_da-oVddhwl_9uCuNZaFUaVBcSZxEov0",
// authDomain: "blord-group.firebaseapp.com",
// projectId: "blord-group",
// storageBucket: "blord-group.appspot.com",
// messagingSenderId: "767421516987",
// appId: "1:767421516987:web:a196a4f8877ad7fe97ad9e",
// measurementId: "G-BHNFQV1W33",
