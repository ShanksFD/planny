import firebase from 'firebase/app';
import 'firebase/firestore'; 
import 'firebase/auth';

var config = {
   apiKey: "AIzaSyCjG07Ox1WQ4QUohYRiHhE-F7Cm41HUlUE",
   authDomain: "planny-dd778.firebaseapp.com",
   projectId: "planny-dd778",
   storageBucket: "planny-dd778.appspot.com",
   messagingSenderId: "548318476925",
   appId: "1:548318476925:web:cb17179a3bfc5952d24f14"
};

firebase.initializeApp(config);
// firebase.firestore().settings({ experimentalForceLongPolling: true });

export const auth = firebase.auth();
export default firebase.firestore();