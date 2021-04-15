import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import { seedDatabase } from "./seed";

export const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: "blogtinomuzambi-6b696.firebaseapp.com",
	projectId: "blogtinomuzambi-6b696",
	storageBucket: "blogtinomuzambi-6b696.appspot.com",
	messagingSenderId: "327039704768",
	appId: "1:327039704768:web:a310158b4ab1c534411725",
};
// Initialize Firebase
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app(); // if already initialized, use that one
}

// seedDatabase(firebaseIn);
export { firebase };
