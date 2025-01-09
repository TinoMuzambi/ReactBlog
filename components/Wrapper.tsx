import { useEffect, useState } from "react";
import { RiLightbulbFlashLine, RiLightbulbFill } from "react-icons/ri";

import { WrapperProps } from "../interfaces";
import Meta from "./Meta";

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		const lsDark = JSON.parse(localStorage.getItem("blogtino-dark") as string);
		if (lsDark === true || lsDark === false) {
			setDark(lsDark);
			document.body.classList.remove("dark");

			lsDark
				? document.body.classList.add("dark")
				: document.body.classList.remove("dark");
		}
	}, []);

	return (
		<>
			<Meta />
			<button
				className="dark-toggle"
				data-mode={dark ? "Switch to light mode" : "Switch to dark mode"}
				onClick={() => {
					setDark(!dark);

					document.body.classList.remove("dark");

					!dark
						? document.body.classList.add("dark")
						: document.body.classList.remove("dark");

					localStorage.setItem("blogtino-dark", JSON.stringify(!dark));
				}}
			>
				{dark ? (
					<RiLightbulbFlashLine className="icon" />
				) : (
					<RiLightbulbFill className="icon" />
				)}
			</button>
			{children}
		</>
	);
};

export default Wrapper;
