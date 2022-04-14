import Link from "next/link";

import { blokProps } from "../interfaces";

const NavLink: React.FC<blokProps> = ({ blok }): JSX.Element => {
	return (
		<Link href={blok.link}>
			<a>
				<li className="nav-link">{blok.text}</li>
			</a>
		</Link>
	);
};
export default NavLink;
