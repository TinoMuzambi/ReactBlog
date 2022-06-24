import { FirebaseAuthProvider } from "@react-firebase/auth";
import { AppProps } from "next/app";
import { useEffect } from "react";
import firebase from "firebase";

import Wrapper from "../components/Wrapper";
import "../sass/App.scss";
import { firebaseConfig } from "../firebase/config";

const MyApp: Function = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		const disableReactDevTools = (): void => {
			const noop = (): void => undefined;
			const DEV_TOOLS = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;

			if (typeof DEV_TOOLS === "object") {
				for (const [key, value] of Object.entries(DEV_TOOLS)) {
					DEV_TOOLS[key] = typeof value === "function" ? noop : null;
				}
			}
		};
		if (process.env.NODE_ENV === "production") disableReactDevTools();
	}, []);

	return (
		// @ts-ignore
		<FirebaseAuthProvider
			databaseURL=""
			firebase={firebase}
			{...firebaseConfig}
		>
			<Wrapper>
				<Component {...pageProps} />
			</Wrapper>
		</FirebaseAuthProvider>
	);
};

export default MyApp;
