import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyCKmX1TmwBaXNJZe82cwmqj0XxrV_hCWRU",
    authDomain: "cantin-management.firebaseapp.com",
    projectId: "cantin-management",
    storageBucket: "cantin-management.appspot.com",
    messagingSenderId: "977909210477",
    appId: "1:977909210477:web:fd53f4f12e695f73654e64",
    measurementId: "G-X8SJ98B0Q9"
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;