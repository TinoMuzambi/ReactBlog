import Link from "next/link";
import { FaBars } from "react-icons/fa";

import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const Navbar: React.FC<blokProps> = ({ blok }): JSX.Element => {
	const toggleCollapse = () => {
		// Toggle collapse class on navbar.
		const nav = document.querySelector(".nav");
		location.pathname === "/"
			? nav?.classList.toggle("collapse")
			: nav?.classList.toggle("collapse-sm");
	};

	return (
		<nav className="nav" id="nav">
			<div className="nav-menu">
				<div className="nav-brand">
					<Link href="/">
						<a>{blok.title}</a>
					</Link>
				</div>
				<div className="toggle-collapse">
					<div className="toggle-icons">
						<span className="fas fa-bars" onClick={toggleCollapse}>
							<FaBars />
						</span>
					</div>
				</div>
				<ul className="nav-items">
					{blok.links.map((link: any, key: number) => (
						<DynamicComponent blok={link} key={key} />
					))}
				</ul>
				<DynamicComponent blok={blok.social_icons[0]} />
			</div>
		</nav>
	);
};
export default Navbar;
