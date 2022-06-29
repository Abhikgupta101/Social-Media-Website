// import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/compat/storage'
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQRocpcuIcfsBmgIal4JUkMb40au5QOc8",
  authDomain: "reels-7f17f.firebaseapp.com",
  projectId: "reels-7f17f",
  storageBucket: "reels-7f17f.appspot.com",
  messagingSenderId: "885532721003",
  appId: "1:885532721003:web:ca20485c307430b885162e"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);

export default app;
