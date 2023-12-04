
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD72x3ysxGG-j4Ydhb4IXVszWrfJrAfFL4",
    authDomain: "perfume-9e74c.firebaseapp.com",
    projectId: "perfume-9e74c",
    storageBucket: "perfume-9e74c.appspot.com",
    messagingSenderId: "126871179533",
    appId: "1:126871179533:web:3367c69e257fbd19f22044"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
