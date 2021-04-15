import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase";

import { firebaseConfig } from "../firebase/config";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Meta from "./Meta";
import Preload from "./Preload";

const Wrapper = ({ children }) => {
	return (
		<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
			<Meta />
			<Preload />
			<Navbar />
			{children}
			<Footer />
		</FirebaseAuthProvider>
	);
};

export default Wrapper;
