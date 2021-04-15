import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase";

import { firebaseConfig } from "./firebase/config";

import App from "./App";

ReactDOM.render(
	<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
		<Router>
			<App />
		</Router>
	</FirebaseAuthProvider>,
	document.getElementById("root")
);
