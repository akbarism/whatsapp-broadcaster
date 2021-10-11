import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./config";
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
