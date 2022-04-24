// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: "blogtinomuzambi-6b696.firebaseapp.com",
	projectId: "blogtinomuzambi-6b696",
	storageBucket: "blogtinomuzambi-6b696.appspot.com",
	messagingSenderId: "327039704768",
	appId: "1:327039704768:web:a310158b4ab1c534411725",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
