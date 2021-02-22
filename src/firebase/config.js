import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: "blogtinomuzambi-6b696.firebaseapp.com",
	projectId: "blogtinomuzambi-6b696",
	storageBucket: "blogtinomuzambi-6b696.appspot.com",
	messagingSenderId: "327039704768",
	appId: "1:327039704768:web:a310158b4ab1c534411725",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
