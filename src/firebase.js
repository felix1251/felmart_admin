// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_z-JQjwHWrVsB2s31zz14MUOFurpmoNA",
  authDomain: "felmart-storage.firebaseapp.com",
  projectId: "felmart-storage",
  storageBucket: "felmart-storage.appspot.com",
  messagingSenderId: "1043441228398",
  appId: "1:1043441228398:web:f634e19b02f7a53de4647f",
  // measurementId: "G-F5N0L866Q8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
